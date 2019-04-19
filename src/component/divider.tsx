import { h } from "../common/format";

/**
 * Show a horizontal divider.
 */
export function Divider(prop: {}) {
	return (
		<table class="divider-wrapper">
			<tr>
				<td class="divider-spacer">
					<table class="divider" cellPadding={0} cellSpacing={0}>
						<tr>
							<td></td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	);
}
