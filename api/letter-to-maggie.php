<?php
require 'config.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $data = json_decode(file_get_contents('php://input'), true);

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;

    // Sender
    $mail->setFrom(FROM_EMAIL, FROM_NAME);

    // Admin recipient
    $mail->addAddress(FROM_EMAIL);

    // If child's parent provided email, send confirmation
    if (!empty($data['email'])) {
        $mail->addReplyTo($data['email']);
    }

    $mail->Subject = 'New Letter to Maggie from ' . $data['name'];
    $mail->Body = "Name: {$data['name']}\n";
    $mail->Body .= "Email: {$data['email']}\n\n";
    $mail->Body .= "Message:\n{$data['message']}";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
