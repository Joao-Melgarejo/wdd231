const params = new URLSearchParams(window.location.search);
const results = document.querySelector("#results");

const firstName = params.get("first");
const lastName = params.get("last");
const phone = params.get("phone");
const email = params.get("email");
const ordinance = params.get("ordinance");
const date = params.get("date");
const locationName = params.get("location");

if (firstName && lastName && email && ordinance && date && locationName) {
  results.innerHTML = `
    <p>Appointment for: <strong>${firstName} ${lastName}</strong></p>
    <p>You are scheduled for a <strong>${ordinance}</strong> appointment on <strong>${date}</strong> at the <strong>${locationName}</strong> temple.</p>
    <p>Your phone number is <strong>${phone || "not provided"}</strong>.</p>
    <p>Your confirmation will be sent to <strong>${email}</strong>.</p>
  `;
} else {
  results.innerHTML = `
    <p>No appointment information was found.</p>
    <p><a href="index.html">Return to the appointment form</a></p>
  `;
}
