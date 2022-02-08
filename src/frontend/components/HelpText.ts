import { customElement, html, WithoutShadowRoot } from './WithoutShadowRoot';

@customElement('nd-help-text')
export class HelpText extends WithoutShadowRoot {
	render() {
		return html`
			<div class="mb-1">
				<pre class="bg-slate-200 inline-block rounded px-0.5">$$</pre> will print a <pre class="bg-slate-200 inline-block rounded px-0.5">$</pre>
			</div>
			<div class="mb-1">
				<pre class="bg-slate-200 inline-block rounded px-0.5">$h</pre> will print the date and time
			</div>
			<div class="mb-1">
				<pre class="bg-slate-200 inline-block rounded px-0.5">$s</pre> will print the second
			</div>
			<div class="mb-1">
				<pre class="bg-slate-200 inline-block rounded px-0.5">$m</pre> will print minute
			</div>
			<div class="mb-1">
				<pre class="bg-slate-200 inline-block rounded px-0.5">$Y</pre> will print the current year (4 digits)
			</div>
			<div class="mb-1">
				<pre class="bg-slate-200 inline-block rounded px-0.5">$M</pre> will print the name of the current month
			</div>
			<div class="mb-1">
				<pre class="bg-slate-200 inline-block rounded px-0.5">$D</pre> will print the name of the current day
			</div>
		`;
	}
}