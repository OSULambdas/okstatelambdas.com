<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "okstatelambdas@gmail.com";
    $subject = "New Contact Form Submission";
    $headers = "From: $email";

    $email_body = "Name: $name\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Message:\n$message";

    mail($to, $subject, $email_body, $headers);

    // Redirect to a thank you page or display a success message
    header("Location: thank_you.html");
    exit;
}
?>
