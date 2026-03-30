import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser"; // <-- 1. Import EmailJS!

export default function Contact() {
  const [openFolders, setOpenFolders] = useState({
    contacts: true,
    findMe: true,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // <-- 2. New state for the loading animation
  const [isSending, setIsSending] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
    };
    setCurrentDate(date.toLocaleDateString("en-US", options).replace(/,/g, ""));
  }, []);

  const toggleFolder = (folder: "contacts" | "findMe") => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setErrors({ email: "" });
  };

  // <-- 3. The upgraded, real-world Submit Function!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ email: "Wrong email address" });
      return;
    }

    // Start the loading state
    setIsSending(true);

    // Prepare the data to match your EmailJS Template
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: currentDate,
    };

    // Send it! (Replace these strings with your actual IDs from Step 1)
    emailjs
      .send(
        "service_tkbel8n", // e.g., 'service_abc123'
        "template_b7jm2md", // e.g., 'template_xyz789'
        templateParams,
        "YhGS6A9r_3FKEEsSg", // e.g., 'aBcDeFgHiJkLmNoP'
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setIsSending(false);
        setIsSubmitted(true); // Show your success screen!
      })
      .catch((err) => {
        console.log("FAILED...", err);
        setIsSending(false);
        alert("Uh oh! The email failed to send. Please try again.");
      });
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitted(false);
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  return (
    <main className="flex flex-1 w-full h-full overflow-hidden text-text-comment font-fira bg-[#0F172B]">
      {/* COLUMN 1: Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-border-line flex flex-col hidden md:flex">
        {/* Contacts Folder */}
        <div className="border-b border-border-line">
          <button
            onClick={() => toggleFolder("contacts")}
            className="w-full flex items-center gap-2 px-4 py-2 text-text-main hover:bg-[#020618] transition-colors border-b border-border-line"
          >
            <span
              className={`transform transition-transform ${openFolders.contacts ? "rotate-90" : ""}`}
            >
              ▸
            </span>
            contacts
          </button>
          {openFolders.contacts && (
            <div className="flex flex-col py-4 px-6 gap-3 text-sm">
              <a
                href="mailto:pinlacnishia@gmail.com"
                className="flex items-center gap-2 hover:text-text-main transition-colors"
              >
                ✉️ <span className="truncate">pinlacnishia@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 hover:text-text-main cursor-pointer transition-colors">
                📞 +64 912 345 6789
              </div>
            </div>
          )}
        </div>

        {/* Find Me Folder */}
        <div className="border-b border-border-line">
          <button
            onClick={() => toggleFolder("findMe")}
            className="w-full flex items-center gap-2 px-4 py-2 text-text-main hover:bg-[#020618] transition-colors border-b border-border-line"
          >
            <span
              className={`transform transition-transform ${openFolders.findMe ? "rotate-90" : ""}`}
            >
              ▸
            </span>
            find-me-also-in
          </button>
          {openFolders.findMe && (
            <div className="flex flex-col py-4 px-6 gap-3 text-sm">
              <a
                href="https://www.linkedin.com/in/nishia-pinlac-2b3a64358/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-text-main transition-colors"
              >
                <span className="text-xl leading-none">↗</span> Linkedin
              </a>
              <a
                href="https://dev.to/nsh15_cmd  "
                className="flex items-center gap-2 hover:text-text-main transition-colors"
              >
                <span className="text-xl leading-none">↗</span> dev.to
              </a>
              <a
                href="https://www.instagram.com/aishinnn_/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-text-main transition-colors"
              >
                <span className="text-xl leading-none">↗</span> Instagram
              </a>
            </div>
          )}
        </div>
      </div>

      {/* COLUMN 2: Form Area */}
      <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar border-r border-border-line relative items-center justify-center p-6">
        {isSubmitted ? (
          /* Success State (Thank You) */
          <div className="flex flex-col items-center justify-center text-center animate-fade-in max-w-sm">
            <h2 className="text-text-main text-3xl font-bold mb-4">
              Thank you! 🤘
            </h2>
            <p className="mb-8">
              Your message has been accepted. You will receive answer soon!
            </p>
            <button
              onClick={resetForm}
              className="bg-accent-orange text-primary-bg font-fira px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
            >
              send-new-message
            </button>
          </div>
        ) : (
          /* Form State */
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-6 animate-fade-in"
          >
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-text-comment">_name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#020618] border border-border-line rounded-lg px-4 py-2 text-text-main focus:outline-none focus:border-text-comment transition-colors"
              />
            </div>

            {/* Email Input (With Error Handling) */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-text-comment">_email:</label>
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  // Changed to red border if error exists
                  className={`w-full bg-[#020618] border rounded-lg px-4 py-2 text-text-main focus:outline-none transition-colors pr-10 ${errors.email ? "border-[#E99287]" : "border-border-line focus:border-text-comment"}`}
                />
                {/* Warning Icon inside input */}
                {errors.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E99287]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {/* Error Message */}
              {errors.email && (
                <span className="text-[#E99287] text-xs absolute -bottom-5">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label className="text-text-comment">_message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-[#020618] border border-border-line rounded-lg px-4 py-2 text-text-main focus:outline-none focus:border-text-comment transition-colors resize-none custom-scrollbar"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSending}
              className={`w-fit mt-2 px-6 py-2 rounded-lg transition-all font-fira ${isFormValid && !isSending ? "bg-accent-orange text-primary-bg hover:bg-opacity-90" : "bg-[#1C2B3A] text-text-comment cursor-not-allowed opacity-50"}`}
            >
              {isSending ? "sending..." : "submit-message"}
            </button>
          </form>
        )}
      </div>

      {/* COLUMN 3: Dynamic Code Snippet */}
      <div className="flex-1 hidden lg:flex flex-col overflow-y-auto custom-scrollbar p-12 justify-center">
        <div className="flex gap-4">
          {/* Line Numbers */}
          <div className="flex flex-col text-right opacity-50 select-none">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <span key={num}>{num}</span>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex flex-col font-fira text-sm leading-relaxed">
            <p>
              <span className="text-accent-purple">const</span>{" "}
              <span className="text-[#4D5BCE]">button</span>{" "}
              <span className="text-accent-purple">=</span>{" "}
              <span className="text-[#4D5BCE]">document</span>.
              <span className="text-[#4D5BCE]">querySelector</span>(
              <span className="text-accent-orange">'#sendBtn'</span>);
            </p>
            <p>
              <br />
            </p>
            <p>
              <span className="text-accent-purple">const</span>{" "}
              <span className="text-[#4D5BCE]">message</span>{" "}
              <span className="text-accent-purple">=</span> {"{"}
            </p>
            <p>
              &nbsp;&nbsp;<span className="text-[#4D5BCE]">name</span>:{" "}
              <span className="text-accent-orange">"{formData.name}"</span>,
            </p>
            <p>
              &nbsp;&nbsp;<span className="text-[#4D5BCE]">email</span>:{" "}
              <span className="text-accent-orange">"{formData.email}"</span>,
            </p>

            {/* The message area can get long, so we wrap it nicely */}
            <p className="max-w-md break-words">
              &nbsp;&nbsp;<span className="text-[#4D5BCE]">message</span>:{" "}
              <span className="text-accent-orange">"{formData.message}"</span>,
            </p>

            <p>
              &nbsp;&nbsp;<span className="text-[#4D5BCE]">date</span>:{" "}
              <span className="text-accent-orange">"{currentDate}"</span>
            </p>
            <p>{"}"}</p>
            <p>
              <br />
            </p>
            <p>
              <span className="text-[#4D5BCE]">button</span>.
              <span className="text-[#4D5BCE]">addEventListener</span>(
              <span className="text-accent-orange">'click'</span>, (){" "}
              <span className="text-accent-purple">=&gt;</span> {"{"}
            </p>
            <p>
              &nbsp;&nbsp;<span className="text-[#4D5BCE]">form</span>.
              <span className="text-[#4D5BCE]">send</span>(
              <span className="text-[#4D5BCE]">message</span>);
            </p>
            <p>{"})"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
