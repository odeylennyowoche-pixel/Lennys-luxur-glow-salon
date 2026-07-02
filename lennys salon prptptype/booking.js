// =======================
// Luxury Glow Salon
// booking.js
// =======================

// Services and staff

const services = {
    "Braids": {
        price: 18000,
        staff: ["Sarah", "Amanda", "Grace"]
    },

    "Hair Styling": {
        price: 12000,
        staff: ["Sarah", "Amanda", "Grace"]
    },

    "Wig Installation": {
        price: 15000,
        staff: ["Sarah", "Grace"]
    },

    "Barbing": {
        price: 5000,
        staff: ["David", "Michael", "James"]
    },

    "Nails": {
        price: 8000,
        staff: ["Jessica", "Sophia"]
    },

    "Lashes": {
        price: 10000,
        staff: ["Chloe", "Emily"]
    }
};

const appointmentsContainer = document.getElementById("appointments");
const addBtn = document.getElementById("addAppointment");
const totalPrice = document.getElementById("totalPrice");
const serviceCount = document.getElementById("serviceCount");

let appointmentNumber = 0;

// Create first appointment automatically
createAppointment();

addBtn.addEventListener("click", createAppointment);

function createAppointment() {

    appointmentNumber++;

    const card = document.createElement("div");
    card.className = "appointment";

    card.innerHTML = `

<h3>Appointment ${appointmentNumber}</h3>

<label>Service</label>

<select class="service">

${Object.keys(services)
.map(service =>
`<option value="${service}">
${service}
</option>`)
.join("")}

</select>

<label>Staff</label>

<select class="staff"></select>

<label>Date</label>

<input type="date" class="date">

<label>Time</label>

<input type="time" class="time">

<p class="price"></p>

<button class="remove">
Remove
</button>

`;

    appointmentsContainer.appendChild(card);

    const serviceSelect = card.querySelector(".service");
    const staffSelect = card.querySelector(".staff");
    const priceText = card.querySelector(".price");
    const removeBtn = card.querySelector(".remove");
    const dateInput = card.querySelector(".date");
    const timeInput = card.querySelector(".time");

setMinimumDates();
generateTimeOptions(timeInput);

    function updateCard() {

        const chosen = services[serviceSelect.value];

        staffSelect.innerHTML = "";

        chosen.staff.forEach(person => {

            const option = document.createElement("option");

            option.value = person;
            option.textContent = person;

            staffSelect.appendChild(option);

        });

        priceText.innerHTML =
        `<strong>Price:</strong> ₦${chosen.price.toLocaleString()}`;

        calculateTotal();

    }

    updateCard();

    serviceSelect.addEventListener("change", updateCard);

    removeBtn.addEventListener("click", () => {

        card.remove();

        calculateTotal();

    });

}

function calculateTotal(){

let total = 0;

const cards = document.querySelectorAll(".appointment");

cards.forEach(card=>{

const service =
card.querySelector(".service").value;

total += services[service].price;

});

totalPrice.textContent =
total.toLocaleString();

serviceCount.textContent =
cards.length;

}

// ---------------------------
// Set today's date as minimum
// ---------------------------

function setMinimumDates() {

    const today = new Date().toISOString().split("T")[0];

    document.querySelectorAll(".date").forEach(date => {

        date.min = today;

    });

}

// Call after creating an appointment
setTimeout(setMinimumDates, 100);

// ---------------------------
// Generate available time slots
// ---------------------------

function generateTimeOptions(timeInput) {

    const datalistId = "time-options";

    if (!document.getElementById(datalistId)) {

        const list = document.createElement("datalist");

        list.id = datalistId;

        for (let hour = 9; hour <= 19; hour++) {

            for (let minute = 0; minute < 60; minute += 30) {

                if (hour === 19 && minute > 0) break;

                const option = document.createElement("option");

                option.value =
                    `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

                list.appendChild(option);

            }

        }

        document.body.appendChild(list);

    }

    timeInput.setAttribute("list", datalistId);

}

// ---------------------------
// Continue to Invoice
// ---------------------------

document.getElementById("continueBtn").addEventListener("click", () => {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {

        alert("Please complete your personal information.");

        return;

    }

    const bookings = [];

    const cards = document.querySelectorAll(".appointment");

    for (const card of cards) {

        const service = card.querySelector(".service").value;
        const staff = card.querySelector(".staff").value;
        const date = card.querySelector(".date").value;
        const time = card.querySelector(".time").value;

        if (!date || !time) {

            alert("Please choose a date and time for every appointment.");

            return;

        }

        bookings.push({

            service,
            staff,
            date,
            time,
            price: services[service].price

        });

    }

    const bookingData = {

        customer: {

            name,
            email,
            phone

        },

        bookings

    };
    console.log("Saving booking...");
    console.log(bookingData);

    localStorage.setItem( "salonBooking", JSON.stringify(bookingData));

    console.log(localStorage.getItem("salonBooking"));

    window.location.href = "invoice.html";

});