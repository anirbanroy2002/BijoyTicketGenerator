function makeTicket()
{
	let source = document.getElementById("source").value;
	let sourceDate = new Date(document.getElementById("journeyDate").value);
	let sourceTime = document.getElementById("journeyTime").value;
	let sourceTimeAMPM;
	let sourceHour = parseInt(sourceTime.substring(0, 2));
	if (sourceHour >= 12)
	{
		let ampm = "PM";
		sourceTimeAMPM = (sourceHour - 12) < 10 ? "0" : "";
		sourceTimeAMPM += (sourceHour - 12);
		if (sourceTimeAMPM == "00") sourceTimeAMPM = "12";
		sourceTimeAMPM +=":"+sourceTime.substring(sourceTime.indexOf(":") + 1,) + " "+ampm;
	}
	else
	{
		let ampm = "AM";
		sourceTimeAMPM = (sourceHour) < 10 ? "0" : "";
		sourceTimeAMPM += sourceHour;
		if (sourceTimeAMPM == "00") sourceTimeAMPM = "12";
		sourceTimeAMPM += ":" + sourceTime.substring(sourceTime.indexOf(":") + 1,) + " "+ampm;
	}
	
	
	let destination = document.getElementById("destination").value;
	let destDate = new Date(document.getElementById("destinationDate").value);
	let destTime = document.getElementById("destinationTime").value;
	let destTimeAMPM;
	let destHour = parseInt(destTime.substring(0, 2));
	if (destHour >= 12)
	{
		let ampm = "PM";
		destTimeAMPM = (destHour - 12) < 10 ? "0" : "";
		destTimeAMPM += (destHour - 12);
		if (destTimeAMPM == "00") destTimeAMPM = "12";
		destTimeAMPM +=":"+destTime.substring(destTime.indexOf(":") + 1,) + " "+ampm;
	}
	else
	{
		let ampm = "AM";
		destTimeAMPM = (destHour) < 10 ? "0" : "";
		destTimeAMPM += destHour;
		if (destTimeAMPM == "00") destTimeAMPM = "12";
		destTimeAMPM += ":" + destTime.substring(destTime.indexOf(":") + 1,) + " "+ampm;
	}
	
	let busName = document.getElementById("busname").value;
	let price = document.getElementById("totalPrice").value;
	let boardingDets = document.getElementById("BrdDesc").value;
	let dropDets = document.getElementById("DropDesc").value;
	let ticketNumber = "TS"+Math.floor(Math.random() * 9) + 1+"R"+Math.floor(10000000 + Math.random() * 90000000);
	let pnrNumber = Math.floor(1000000 + Math.random() * 9000000);

	let sourceDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][sourceDate.getDay() - 1];
	let sourceMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][sourceDate.getMonth()];
	let destDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][destDate.getDay() - 1];
	let destMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][destDate.getMonth()];
	let ticketBodyCode = `

<body><div class="bodycontainer"><div class="maincontent"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="message"><tbody><tr><td colspan="2"><table width="100%" cellpadding="12" cellspacing="0" border="0"><tbody><tr><td><div style="overflow:hidden"><font size="-1">
<div id="m_8818782046426579370body" style="margin:0!important;padding:0!important;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
<div>
<table style="margin:0 auto" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody><tr>
<td>
<table class="m_8818782046426579370mobile" style="background-color:#ffffff;color:#000000;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;font-size:18px;line-height:36px;margin:0 auto;padding:0" border="0" cellpadding="0" cellspacing="0" role="presentation" width="600">
<tbody><tr>
<td style="padding-top:16px">
<table class="m_8818782046426579370ticketDetails" border="0" cellpadding="0" cellspacing="0" role="presentation" width="600" style="margin:0 auto;border:solid 1px #dddddd;background:#d84e55;background-color:#00377b">
<tbody><tr>
<td style="width:100%;padding-top:10px;padding-bottom:10px">
<table>
<tbody><tr>
<td>
<img src="data:image/png;base64,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" style="max-height:42px;width:60px;padding:0px 0px 0px 45px;float:left;margin:0px 15px 15px 0px">
</td>
<td style="width:305px;height:23px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;font-size:19px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.7;letter-spacing:normal;text-align:center;color:#ffffff;padding-left:14px;background-image:url(data:image/png;base64,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);background-repeat:no-repeat;background-size:417px;background-position:top">
redBus Ticket Information<br>
<div style="font-family:roboto,helvetica neue,helvetica,arial,sans-serif;font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal">`+source+`-`+destination+` on `+sourceDay+`, `+sourceMonth+` `+sourceDate.getDate()+`, `+sourceDate.getFullYear()+`</div></td>
<td>
<img src="data:image/png;base64,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" style="max-height:42px;width:76px;padding:0px 0px 15px 50px;float:left;margin:0px 15px 15px 0px">
</td>
</tr><tr>
</tr></tbody></table>
<div style="height:0.1px;padding-left:5px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;opacity:0.18;border:solid 1px #ffffff">
</div>
<table>
<tbody><tr>
<td style="width:305px;height:23px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;font-size:19px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.7;letter-spacing:normal;text-align:center;color:#ffffff;padding-left:116px">
<span style="width:336px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:normal;color:#ffffff;white-space:nowrap;display:inline-block">Ticket
Number: <b>`+ticketNumber+`</b> &nbsp;&nbsp;|&nbsp;&nbsp;
PNR&nbsp;No:&nbsp;<b>`+pnrNumber+`</b></span>
</td>
</tr><tr>
</tr></tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
<tr>
<td style="padding-top:16px">
<table class="m_8818782046426579370ticketDetails" border="0" cellpadding="0" cellspacing="0" role="presentation" width="580" style="margin:0 auto;border-radius:7px 7px 7px 7px;border:solid 0px #dddddd">
<tbody>
<tr>
<td>
<div style="line-height:0.9;padding-left:3px;padding-bottom:10px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;font-size:14px;font-weight:normal;font-stretch:normal;letter-spacing:normal;color:#47475d">
<span style="font-weight:normal;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">Hey Utpal Singha,
</span>
</div>
<div style="margin-top:16px;font-size:14px;font-stretch:normal;line-height:1.25;letter-spacing:normal;color:#47475d;padding-bottom:10px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
Thank you for booking your bus ticket with redBus. Here are the ticket details for your upcoming trip from `+source+` to `+destination+` on `+sourceDay+`, `+sourceMonth+` `+sourceDate.getDate()+`, `+sourceDate.getFullYear()+`</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="padding-top:0px">
<table class="m_8818782046426579370ticketDetails" border="0" cellpadding="0" cellspacing="0" role="presentation" width="580" style="margin:0 auto;border:solid 1px #dddddd;border-radius:7px 7px 0px 0px">
<tbody><tr>
<td>
<div style="background-color:#e5ebf8;font-size:16px;padding:8px 24px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.43;letter-spacing:normal;color:#3e3e52;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
Ticket Details
</div>
</td>
</tr>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody><tr>
<td style="width:60%;padding-right:10px">
<table>
<tbody><tr>
<td style="padding-top:8px;width:53%">
<div style="font-size:16px;font-stretch:normal;font-style:normal;line-height:1.25;letter-spacing:normal;color:#3e3e52;font-weight:bold;padding-left:24px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
<span style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:2.2;letter-spacing:normal;color:#747f8d;margin:0;white-space:nowrap;overflow-x:auto;overflow-y:hidden;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">Journey
Date and Time</span>
</div>
<div style="font-size:16px;font-stretch:normal;font-style:normal;line-height:1.25;letter-spacing:normal;color:#3e3e52;font-weight:bold;padding-left:22px">
<img style="height:24px;width:24px;margin-right:4px;float:left" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABHNCSVQICAgIfAhkiAAAAyZJREFUeJzt28Fr01AcB/Dvr6vthCHsuJOe1kLxIAjeFIbnFguNHoowpv4Dzusog4GDnTxOhyBDWYtKd5YdvSsUWoVRBdGbBzdd260/D0m2dNvra2NeWrvfB8aS5e3lvV/zXvJLE0AIIYQQQgiTahlrqZrJ/aplrKVRakMkqIoYPA/GBIPng6pzGNoQWIDAiHX8HgQDbSDtPpnpU+b2PRDPMZACYyKonQ8EYYeACpjWpssbz4iIuxfvop7NTzX2G+sMzATbyuFAwFY8Gs9ferP+XVVGOcSYmUY5OADAwExjv7HOzMoDRbmhlrbuM3jVKdUEaGF8LPZCFe1qOnd4qCY3S9qha0Ivbahn81N7B827AC+6cxWBHiQ2i09PKx9V7o14Doe7o4VkubjctXWEJhgxO5gD0kMbnA94uZqxAPBj+/94DsCpAVIPMSDlLo+PxV7o20Yr9gRIK7qypvTTBm+fvH09WafCMAwZ03rpY3DXQSNKAqQhAdKQAGlIgDTU10Ee3tn+rJEjSEMCpNHTEDsLF4oqcgRpSIA0JEAaPc1B/4oLhSgqlaMPI5Xap0KhPah6+mE0m99O5xItwitmXOncK7WI8WS6vPFId084yHqOG2g2z8zUAl6f6JS98RyDH37O3rkVVj1+GQtQfXY27t6IItAeCDXn54tbpt3mG2HV45exAP3e3T2a34g/JsulZLJcShLBOvwz+EJY9fglZzGNcM5iwPntdC4BAM125CLg78QTVD39MBagP5OTjYkfP+0VxuUmULVXjjrFwLew6vHL2BC7urraAuGlajsRtSkSKYVVj19Gh9hBDLPRJr0H4zrciZSoTcBXJn6eeFv8EGY9fsjXPg752scnycU0JBdzSC7mk+RiGpKLachZTENyMQ3JxTQkF9OQXExDcjFH/xeKhB13sZ7NTwXasiHQ0SdPX49TBoiAirtsP1c8Wrx98vb1OPUcxLQG8DVnZbGasdDtQfL/RceD5C6mNVV55dxiv8RivRvlVxEA+32N6XLxpirZVQ8xIo5H43kCtsw1b7Dcl1m63QmQ16F83CYRQgghhBBCCGHWX8TFMSeYHE6FAAAAAElFTkSuQmCC"><span style="font-size:14px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.25;letter-spacing:normal;color:#3e3e52;font-weight:bold;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">${sourceDate.getDate()}/${(sourceDate.getMonth()+1)<10?"0":""}${(sourceDate.getMonth()+1)}/${sourceDate.getFullYear()}, ${sourceTimeAMPM}</span>
</div>
</td></tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
<tr>
<td>
<div style="border:0.3px dashed #7e7e8c;margin:13px 0px 0px 24px;width:90%;vertical-align:bottom">
</div>
<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody><tr>
<td>
<table class="m_8818782046426579370small-screen" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="48%">
<tbody><tr>
<td>
<p style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;margin:0;padding:17px 24px 0px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
Travels</p>
<table style="margin:0 auto" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody><tr>
<td>
<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="5%">
<tbody><tr>
<td><img style="max-width:100%;min-width:24px;width:0%;margin:4px 0px 0px 24px;background-blend-mode:normal!important;background-clip:content-box!important;background-position:50% 50%!important;background-color:rgba(0,0,0,0)!important;background-image:var(--sf-img-7)!important;background-size:100% 100%!important;background-origin:content-box!important;background-repeat:no-repeat!important" src="data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;72&quot; height=&quot;72&quot;><rect fill-opacity=&quot;0&quot;/></svg>">
</td>
</tr>
</tbody></table>
<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%">
<tbody><tr>
<td style="padding-top:5px;padding-left:7px">
<div style="margin-top:2px;font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.43;letter-spacing:normal;color:#47475d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
`+busName+` </div>
<div style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
Volvo Multi-Axle A/C seater/sleeper (2+1)</div>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
<table class="m_8818782046426579370small-screen" align="right" border="0" cellpadding="0" cellspacing="0" role="presentation" width="45%">
<tbody><tr>
<td>
<p style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;margin:0;padding:17px 24px 0px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
Ticket Price</p>
<table style="margin:0 auto" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody><tr>
<td>
<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="5%">
<tbody><tr>
<td><img style="max-width:100%;min-width:24px;width:0%;margin:4px 0px 0px 24px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAF96VFh0UmF3IHByb2ZpbGUgdHlwZSBBUFAxAAAImeNKT81LLcpMVigoyk/LzEnlUgADYxMuE0sTS6NEAwMDCwMIMDQwMDYEkkZAtjlUKNEABZgamFmaGZsZmgMxiM8FAEi2FMk61EMyAAAB1ElEQVRIie1SPWhTURg9514tLqVOQkAaHZqg3QRHq6MovBeKL5ROwSFzHYqKq0OgoptDLdjBQVOVpC7OdnDWQd5rsVHIIBTbIGSo9t3jUJukJIT21dKlBy583/1+zne+e4FjHDXYL6hi8eTKj8ZDUVdJzoycOb3Y6Wcq5TeJCWqFwqnfG83XELYIPhbxAtBPCN/bPkvZ6qun/QhMr8s17/bg5nrzPcSNzKXRW5nF8ocBmjGAgyA+tXy5O1Euf3/PCmq5iXN/nBsW8AhATOCurNxOXLFJke4ZxeeieSu6FKVZiHOwqgDAgGz9fOXlty6CyA/uCZim8KXfRL0gcJSABfRZxEUCM9nqQmlXUuQHjdXxyfR+mwPA6vhkOvLyay3bDxpdSaEXKEnzXvWd9omDNF3JTVyTiy+LsNL2mgFAHaP2/EV7wbIfPIgVz4tMARgiUQIw9O+0kFiBxCljOSan69nqwpPOWOhtKwEOoADQLweXNpYf+2UlVmDIqdip7KQw8oLNXdT/g2CkWn5XyxWGt0zzggOsYizR4goAIMZSV8FhfdPWG5CoR37+RpLmy15wk+TXto36Tqy9Ipoi5GZDLzi7XwIHABJCL5CIOmiKSQY9xuHgL/pxyDFWjnDqAAAAAElFTkSuQmCC">
</td>
</tr>
</tbody></table>
<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%">
<tbody><tr>
<td style="padding-top:5px;padding-left:7px">
<div style="margin-top:2px;font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.43;letter-spacing:normal;color:#47475d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
Rs. `+price+`.0</div>
<div style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
(inclusive of GST <br>and
service charge, if any) </div>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
<div style="border:0.3px dashed #7e7e8c;margin:13px 0px 0px 24px;width:90%;vertical-align:bottom">
</div>
</td>
</tr>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody><tr>
<td>
<table class="m_8818782046426579370small-screen" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="48%">
<tbody><tr>
<td>
<p style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;margin:0;padding:17px 24px 0px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
Boarding Point</p>
<table style="margin:0 auto" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody><tr>
<td>
<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="5%">
<tbody><tr>
<td><img style="max-width:100%;min-width:24px;width:0%;margin:4px 0px 0px 24px;background-blend-mode:normal!important;background-clip:content-box!important;background-position:50% 50%!important;background-color:rgba(0,0,0,0)!important;background-image:var(--sf-img-9)!important;background-size:100% 100%!important;background-origin:content-box!important;background-repeat:no-repeat!important" src="data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;72&quot; height=&quot;72&quot;><rect fill-opacity=&quot;0&quot;/></svg>">
</td>
</tr>
</tbody></table>
<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%">
<tbody><tr>
<td style="padding-top:5px;padding-left:7px">
<div style="margin-top:2px;font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.73;letter-spacing:normal;color:#47475d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
`+source+` </div>
<div style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
`+boardingDets+` </div>
<div style="margin-top:2px;font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.7;letter-spacing:normal;color:#1034d9;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
<a href="#" style="text-decoration:none;color:#1034d9;font-family:roboto,helvetica neue,helvetica,arial,sans-serif" target="_blank">
${Math.random() < 0.5 ? 8 : 9}`+Math.floor(100000000 + Math.random() * 900000000)+`</a><br>
</div>
<div style="margin-top:2px;font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.7;letter-spacing:normal;color:#1034d9;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
<a href="#" style="text-decoration:none;color:#1034d9;font-family:roboto,helvetica neue,helvetica,arial,sans-serif" target="_blank">
${Math.random() < 0.5 ? 8 : 9}`+Math.floor(100000000 + Math.random() * 900000000)+`</a><br>
</div>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
<table class="m_8818782046426579370small-screen" align="right" border="0" cellpadding="0" cellspacing="0" role="presentation" width="48%">
<tbody><tr>
<td>
<p style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;margin:0;padding:17px 24px 0px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
Dropping Point</p>
<table style="margin:0 auto" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody><tr>
<td>
<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="5%">
<tbody><tr>
<td><img style="max-width:100%;min-width:24px;width:0%;margin:4px 0px 0px 24px;background-blend-mode:normal!important;background-clip:content-box!important;background-position:50% 50%!important;background-color:rgba(0,0,0,0)!important;background-image:var(--sf-img-9)!important;background-size:100% 100%!important;background-origin:content-box!important;background-repeat:no-repeat!important" src="data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;72&quot; height=&quot;72&quot;><rect fill-opacity=&quot;0&quot;/></svg>">
</td>
</tr>
</tbody></table>
<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%">
<tbody><tr>
<td style="padding-top:5px;padding-left:7px">
<div style="margin-top:2px;font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.73;letter-spacing:normal;color:#47475d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
`+destination+`</div>
<div style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
`+dropDets+`</div>
<div style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;padding-top:4px">
DROPPING DATE &amp; TIME:<br> <strong style="color:#47475d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">${destDate.getDate()}/${(destDate.getMonth()+1)<10?"0":""}${(destDate.getMonth()+1)}/${destDate.getFullYear()}, ${destTimeAMPM}</strong></div>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
<div style="border:0.3px dashed #7e7e8c;margin:13px 0px 0px 24px;width:90%"></div>
<table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" width="90%">
<tbody><tr>
<td>
<p style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:2.2;letter-spacing:normal;color:#747f8d;margin:0;padding:17px 24px 0px;white-space:nowrap;overflow-x:auto;overflow-y:hidden;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
Passenger Details</p>
</td>
<td style="padding-right:36px">
<p style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.33;letter-spacing:normal;color:#747f8d;margin:0;padding:17px 24px 0px;padding-right:2px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;white-space:nowrap;overflow-x:auto;overflow-y:hidden">
Seat no</p>
</td>
</tr>
<tr>
<td style="padding-left:25px" align="left">
<img style="height:24px;width:24px;margin-right:4px;float:left" src="data:image/png;base64,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">
<h4 style="margin-top:2px;font-size:14px;font-weight:bold;font-stretch:normal;font-style:normal;line-height:1.73;letter-spacing:normal;color:#47475d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">Utpal Singha<div style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.0;letter-spacing:normal;color:#747f8d;padding-left:29px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
`+(new Date().getFullYear() - 1993)+`Yrs, MALE</div>
</h4>
</td><td style="vertical-align:top;padding-left:1px">
<p style="font-size:16px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:0.1;letter-spacing:normal;margin:0;padding:11px 24px 0px;padding-right:2px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;white-space:nowrap;color:#d5585d">
`+(Math.floor(Math.random() * 40) + 1)+`${["A","B","C","D"][Math.floor(Math.random() * 4)]}</p>
</td>
</tr>
<tr>
<th>
<div style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.0;letter-spacing:normal;color:#747f8d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
</div>
</th>
</tr>
<tr>
<td style="padding-left:25px" align="left">
<br>
</td><td style="vertical-align:top;padding-left:1px">
<p style="font-size:16px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:0.1;letter-spacing:normal;margin:0;padding:11px 24px 0px;padding-right:2px;font-family:roboto,helvetica neue,helvetica,arial,sans-serif;white-space:nowrap;color:#d5585d"><br></p>
</td>
</tr>
<tr>
<th>
<div style="font-size:12px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.0;letter-spacing:normal;color:#747f8d;font-family:roboto,helvetica neue,helvetica,arial,sans-serif">
</div>
</th>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
<tr>

</tr>
<tr>

</tr>
<tr>

</tr>
<tr>
<td>

</td>
</tr>
<tr>

</tr>







</tbody></table>
</td></tr></tbody></table></div>
<img alt="" src="data:," style="display:none;width:1px;height:1px">
</div>
</font></div></td></tr></tbody></table></td></tr></tbody></table></div></div>
<div id="printTicket">
<button onclick="window.print()">SAVE AS PDF</button>
</div>
</body>

`;
document.body.innerHTML = ticketBodyCode;
}

let GenBtn = document.getElementById("genTicket");
GenBtn.onclick = () =>
{ 
	document.body.style = "";
	makeTicket();
};
