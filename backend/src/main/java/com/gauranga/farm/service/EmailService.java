package com.gauranga.farm.service;

import com.gauranga.farm.model.Order;
import com.gauranga.farm.model.OrderItem;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Async
    public void sendOrderConfirmationEmail(Order order) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(order.getEmail());
            helper.setSubject("Order Confirmation - Gauranga Organic Farm");

            StringBuilder htmlContent = new StringBuilder();
            htmlContent.append("<h2>Thank you for your order, ").append(order.getName()).append("!</h2>");
            htmlContent.append("<p>We have successfully received your order and are preparing it for shipment.</p>");
            
            htmlContent.append("<h3>Order Summary (Order ID: #").append(order.getId()).append(")</h3>");
            htmlContent.append("<table border='1' cellpadding='10' style='border-collapse: collapse;'>");
            htmlContent.append("<tr><th>Item</th><th>Quantity</th><th>Price</th></tr>");
            
            for (OrderItem item : order.getItems()) {
                htmlContent.append("<tr>");
                htmlContent.append("<td>").append(item.getProductName()).append("</td>");
                htmlContent.append("<td>").append(item.getQuantity()).append("</td>");
                htmlContent.append("<td>₹").append(item.getPrice()).append("</td>");
                htmlContent.append("</tr>");
            }
            
            htmlContent.append("</table>");
            htmlContent.append("<h3>Total Amount: ₹").append(order.getTotalAmount()).append("</h3>");
            
            htmlContent.append("<h4>Shipping Address:</h4>");
            htmlContent.append("<p>").append(order.getAddress()).append("<br>")
                       .append(order.getCity()).append(", ").append(order.getState()).append(" ").append(order.getZip()).append("</p>");
            
            htmlContent.append("<br><p>If you have any questions, feel free to reply to this email.</p>");
            htmlContent.append("<p>Best Regards,<br><strong>Gauranga Organic Farm</strong></p>");

            helper.setText(htmlContent.toString(), true);
            
            mailSender.send(message);
            System.out.println("Order confirmation email sent to: " + order.getEmail());
            
        } catch (MessagingException e) {
            System.err.println("Failed to send email to: " + order.getEmail());
            e.printStackTrace();
        }
    }
}
