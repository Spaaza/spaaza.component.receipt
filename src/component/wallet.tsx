import { amount, Component, h, sumFieldValues, sumFieldValuesConditional } from "../common/format";
import { LangBlock, LangStrings } from "../common/language";
import { RawReceiptData, RawWalletData, RawContributionData } from "../common/receiptdata";

interface WalletData {
	wallet?: RawWalletData;
	totalEarned: number;
	totalSpent: number;
	currencySymbol: string;
	showPoints:boolean;
}

const renderWallet = (data: WalletData, strings: LangBlock) => {
	const { wallet, totalEarned, totalSpent, currencySymbol, showPoints } = data;
	if (! (wallet && showPoints && (totalEarned || totalSpent))) {
		// don't add a wallet section if it does not exist or if nothing changed and don't show points if set
		return null;
	}

	const renderContrib = (contrib: RawContributionData) => (
		<tr>
			<td>&nbsp;&nbsp;&nbsp;&nbsp;{contrib.campaign_title}</td>
			<td align="right">{amount(contrib.amount, currencySymbol)}</td>
		</tr>
	);

	const renderEarned = () => {
		if (! totalEarned) {
			return null;
		}

		return (
			<tr>
				<td>{wallet.title} {strings.earned}</td>
				<td align="right">{ amount(totalEarned, currencySymbol) }</td>
			</tr>
		);
	};

	const renderSpent = () => {
		if (! totalSpent) {
			return null;
		}
		return (
			<tr>
				<td>{wallet.title} {strings.spent}</td>
				<td align="right">{ amount(totalSpent, currencySymbol) }</td>
			</tr>
		);
	};

	return (<table class="receipt-wallet">
		<tr><td class="receipt-strong">{wallet.title}</td></tr>

		{ renderEarned() }
		{ (wallet.contributions.length > 1) && wallet.contributions.map(renderContrib) }
		{ renderSpent() }
	
		<tr>
			<td>{strings["new-balance"]}</td>
			<td align="right" class="receipt-strong">{amount(wallet.total, currencySymbol)}</td>
		</tr>
		</table>
	);
};

const applyWalletPointsRatio = (value: number, walletPointsRatio: number) => {
	if (walletPointsRatio <= 0) {
		return value;
	}
	return Math.round(value * walletPointsRatio);
};

/**
 * Shows any monetary wallet mutations with optional points for money scaling.
 */
export const MonetaryWallet: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderWallet({
		wallet: data.monetary_wallet && {
			title: data.monetary_wallet.title,
			total: applyWalletPointsRatio(data.monetary_wallet.total, data.wallet_points_ratio),
			contributions: data.monetary_wallet.contributions.map(c => ({
				campaign_title: c.campaign_title,
				amount: applyWalletPointsRatio(c.amount, data.wallet_points_ratio)
			}))
		},
		showPoints:true,
		totalEarned: applyWalletPointsRatio(sumFieldValues(data.monetary_wallet ? data.monetary_wallet.contributions : [], "amount"), data.wallet_points_ratio),
		totalSpent: applyWalletPointsRatio(sumFieldValuesConditional(data.basket_vouchers, "amount", "type", "wallet"), data.wallet_points_ratio),
		currencySymbol: data.wallet_points_ratio > 0 ? "pts" : data.chain.currency_symbol, // substitute "pts" when using points for wallets
	}, strings.wallet);

/**
 * Shows any points wallet mutations.
 */
export const PointsWallet: Component = (data: RawReceiptData, strings: LangStrings) =>
	renderWallet({
		wallet: data.points_wallet,
		showPoints: data.show_points,
		totalEarned: (data.points_wallet && sumFieldValues(data.points_wallet.contributions, "amount")) || 0,
		totalSpent: 0,
		currencySymbol: "pts"
	}, strings.wallet);
