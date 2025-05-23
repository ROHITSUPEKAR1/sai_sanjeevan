 const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous messages
    ["nameError", "emailError", "messageError"].forEach((id) => {
      document.getElementById(id).textContent = "";
    });
    formMessage.textContent = "";
    formMessage.className = "";

    let hasError = false;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Name validation
    if (name.length < 3) {
      document.getElementById("nameError").textContent =
        "Please enter at least 3 characters.";
      hasError = true;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      hasError = true;
    }

    // Message validation
    if (message.length < 3) {
      document.getElementById("messageError").textContent =
        "Please enter a message (at least 10 characters).";
      hasError = true;
    }

    if (!hasError) {
      const formData = new FormData(form);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            formMessage.textContent = "Thank you! Your message has been sent successfully.";
            formMessage.className = "success-message";
            form.reset();
          } else {
            formMessage.textContent = "Oops! Something went wrong. Please try again.";
            formMessage.className = "error-message-global";
          }
        })
        .catch(() => {
          formMessage.textContent = "An error occurred. Please try again.";
          formMessage.className = "error-message-global";
        });
    }
  });