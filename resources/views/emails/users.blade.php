<meta name="viewport" content="width=device-width, initial-scale=1">


<div style="font-family: Arial, Helvetica, sans-serif; text-align: center">
  <!-- <div style="margin-top: 2%">
        <img src="img/logo1.jpg" alt="bluepoolgardenlogo" width="25%">
    </div> -->
  <div>
    <div class="w3-panel w3-card" style="width: 100%;">

      <p style="font-size: 25px; color: blue;">Hi {{$user->firstname}} {{$user->lastname}}, <br>
        Thank you for booking at Bluepool Garden!</p>

      <br><br>
      <p>This is your credentials</p>
      <h1>Username:</h1><span>{{$user->email}}</span>
      <h1>Password:</h1><span>{{$password}}</span>



      <!-- <img src="img/map.jpg" alt="bluepoolgardenlogo" width="100%"> -->
      <p>How to get to the Hotel by: Google Map <br> Blue Pool Garden, Tagbilaran North Road, Maribojoc, Bohol</p>
      <br>
      <p style="margin-bottom: 5%">Thank you for choosing Bluepool Garden.<br>
        For further inquiries you may call 09217661951 <br>or send an email at bluepoolgarden2@gmail.com<br></p>
      <h3>Please read the policy below!</h3>
      <p style="margin-bottom: 5%">Advance Payment and Cancellation Policy.<br>
        You must pay for your advance payment through bank deposit or you may send the payment through Palawan Express Pera Padala.<br>
        If you cannot pay for your advanced payment two(2) days before your check-in date, your booking will be cancelled.<br>
        Reminder! Advance payment is not necessary if you book for today and your check-in date is tomorrow.<br>
        You can deposit the payment in any BPI Bank via this information below!<br>
        <br>Acount Name: Maria Paz Bacareza <br><br>Accout Number: 1234 5678 9011 2234<br></p>
    </div>
  </div>
</div>