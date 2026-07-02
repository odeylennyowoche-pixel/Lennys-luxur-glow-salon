// Retrieve booking data from localStorage

const booking = JSON.parse(localStorage.getItem("salonBooking"));

// If there is no booking, return to booking page
if (!booking) {
    alert("No booking found.");
    window.location.href = "booking.html";
}

// Display customer information
document.getElementById("customerName").textContent =
    booking.customer.name;

document.getElementById("customerEmail").textContent =
    booking.customer.email;

document.getElementById("customerPhone").textContent =
    booking.customer.phone;

// Get the invoice table body
const tbody = document.getElementById("invoiceBody");

let total = 0;

// Add each appointment to the invoice
booking.bookings.forEach(item => {

    total += item.price;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${item.service}</td>
        <td>${item.staff}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
        <td>₦${item.price.toLocaleString()}</td>
    `;

    tbody.appendChild(row);

});

// Display total
document.getElementById("grandTotal").textContent =
    total.toLocaleString();

// Confirm Booking button
document.getElementById("confirmBooking")
.addEventListener("click", () => {

    alert("🎉 Booking Confirmed!");

    // Later we'll send the booking to the database here.
});