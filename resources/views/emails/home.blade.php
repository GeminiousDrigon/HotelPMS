<meta name="viewport" content="width=device-width, initial-scale=1">


<div style="font-family: Arial, Helvetica, sans-serif;">
    <div style="margin-top: 2%">
        <img src="img/logo1.jpg" alt="bluepoolgardenlogo" width="25%">
    </div>
    <div>
        <div class="w3-panel w3-card" style="width: 50%;">

            <p style="font-size: 25px; color: blue;">Hi Junrex, <br>
                Thank you for booking at Bluepool Garden!</p>

            <h3>Get your QR Code</h3>
            <img src="{!!$message->embedData(QrCode::format('png')->size(200)->generate('www.facebook.com'), 'QrCode.png', 'image/png')!!}">
            <br><br>
            <p>Please show this Qr code to the frontdesk for check-in</p>


            <img src="img/map.jpg" alt="bluepoolgardenlogo" width="100%">
            <p>How to get to the Hotel by: Google Map <br> Blue Pool Garden, Tagbilaran North Road, Maribojoc, Bohol</p>
            <br>
            <p style="margin-bottom: 5%">Thank you for choosing Bluepool Garden.<br>
                For further inquiries you may call 09361180320 <br>or send an email at bluepoolgarden2@gmail.com<br></p>
        </div>
    </div>
</div>