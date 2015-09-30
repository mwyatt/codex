<div class="typography">
	<p>There is no grid system but just a method of creating columns easily.</p>
	<p>Once I understand more about flexbox perhaps replace this?</p>
</div>
<div class="example-code">
	<div class="cols">
		<div class="col-six">6 Columns</div>
		<div class="col-six">6 Columns</div>
	</div>
	<div class="cols">
		<div class="col-four">4 Columns</div>
		<div class="col-four">4 Columns</div>
		<div class="col-four">4 Columns</div>
	</div>
</div>
<pre class="rainbow-pre"><code data-language="css">.container {
    clearfix;
}

.column-container {
    float: left;
    width: 33.33%;
    padding-left: 20px;
}

.column-container:first-child {
    padding-left: 0;
}

.column {
    whatever;
}
</code></pre>
