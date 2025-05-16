<?php
require 'config.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate email
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address.');
    }

    // Save subscriber to file
    $subscriber = [
        'email' => $data['email'],
        'date' => date('Y-m-d H:i:s')
    ];
    $result = file_put_contents('subscribers.txt', json_encode($subscriber) . "\n", FILE_APPEND);
    if ($result === false) {
        throw new Exception('Unable to save your subscription.');
    }

    // Send welcome email
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;

    $mail->setFrom(FROM_EMAIL, FROM_NAME); // <-- Important!
    $mail->addAddress($data['email']);
    $mail->Subject = "Welcome to Maggie's Newsletter!";
    $mail->isHTML(false);
    $mail->Body = "Thank you for subscribing to Maggie's newsletter!\n\nYou'll receive updates about new books, events, and special offers.";

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    // Log the full error for debugging
    if (isset($mail) && $mail instanceof PHPMailer) {
        file_put_contents('newsletter_error.log', $mail->ErrorInfo . "\n", FILE_APPEND);
        echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
    } else {
        file_put_contents('newsletter_error.log', $e->getMessage() . "\n", FILE_APPEND);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
