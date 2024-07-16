function sendEmail() {
  var userInfo = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  const serviceId = "service_uazmgyg";
  const templateId = "template_qilt8w2";

  console.log("Sending email with the following userInfo:", userInfo);

  emailjs
    .send(serviceId, templateId, userInfo)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log("Email sent successfully:", res);
      alert("Message has been successfully sent");
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again later.");
    });
}
