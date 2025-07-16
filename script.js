console.log("This is my script");

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Clicked!");

    resultCont.innerHTML = `<img width="123" src="img/loading.svg" alt="">`

    const key = "ema_live_ITkV5Pqq40WNdMLdjqMZlNcb4AEBrNvWiSFd1MYE";
    const email = document.getElementById("username").value;
    const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("API request failed");

        const result = await res.json();

        // Validate email based on result
        const isValid = (
            result.format_valid === true &&
            result.smtp_check === true &&
            result.state === "deliverable" &&
            result.disposable === false &&
            result.reason !== "invalid_mailbox"
        );


        let summary = isValid
            ? `<div style="color:green; font-weight:bold; font-size:20px;">✅ Valid Email</div>`
            : `<div style="color:red; font-weight:bold; font-size:20px;">❌ Invalid Email</div>`;

        // Detailed info output
        let str = "";
        for (let key of Object.keys(result)) {
            if (result[key] !== "" && result[key] !== " " && result[key] !== null) {
                str += `<div><strong>${key}</strong>: ${result[key]}</div>`;
            }
        }

        resultCont.innerHTML = summary + "<hr>" + str;

    } catch (err) {
        console.error("Fetch error:", err);
        resultCont.innerHTML = `<div style="color:red;">❌ Failed to fetch data. Check API key, internet connection, or CORS issues.</div>`;
    }
});
