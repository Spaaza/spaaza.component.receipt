export interface RawLineItemData {
	name: string;
	description: string;
	type: string;
	original_price: number;
	quantity: number;
	sale_price: number;
	vouchers: number;
	distinguisher_type: string;
	barcode: string;
	metadata: {
		color: string;
		size: string;
		image: string;
	};
	sale_discount: string;
}

export interface RawTaxLineData {
	tax_value: number;
	order_value: number;
	rate: number;
}

export interface RawAddressData {
	address_1: string;
	address_2: string;
	address_3: string;
	towncity: string;
	postal_code: string;
	country_code: string;
	location: {
		lat: number;
		lon: number;
	};
}

export interface RawBusinessData {
	id: number;
	name: string;
	address: RawAddressData;
	phone_number: string;
	email: string;
	website_url: string;
}

export interface RawChainData {
	id: number;
	name: string;
	email: string;
	logo_url: string;
	website_url: string;
	currency: string;
	currency_symbol: string;
	business: RawBusinessData;
}

export interface RawShopperData {
	id: number;
	user_name: string;
	entity_code: string;
	first_name: string;
	last_name: string;
	country_code: string;
	gender: string;
	birthday: string;
	total_points_balance: number;
	email: string;
	shipping_address: RawAddressData;
	billing_address: RawAddressData;
}

export interface RawContributionData {
	amount: number;
	campaign_title: string;
}

export interface RawWalletData {
	contributions: RawContributionData[];
	total: number;
	title: string;
}

export interface RawVoucherData {
	campaign_title: string;
	voucher_text: string;
	amount: number;
	type: string;
}

export interface RawReceiptData {
	id: string;
	timestamp: string; // ISO date
	quantity: number;
	subtotal: number;
	total_value: number;
	note: string;
	payment_method: string;
	download_url?: string;
	retailer_basket_code?: string;
	wallet_points_ratio: number;

	line_items?: RawLineItemData[];
	tax_lines?: RawTaxLineData[];

	chain: RawChainData;
	shopper: RawShopperData;

	monetary_wallet?: RawWalletData;
	points_wallet?: RawWalletData;
	basket_vouchers: RawVoucherData[];
}
