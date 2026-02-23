
const totalCountEl = document.getElementById("total");
const interviewCountEl = document.getElementById("interviewCount");
const rejectCountEl = document.getElementById("rejectCount");
const emptyMessage = document.querySelector(".empty");
const jobList = document.querySelector(".jobs");

let interviewCount = 0;
let rejectCount = 0;
let totalCount = document.querySelectorAll(".job").length;


function setupJobListeners(job) {
    const interviewBtn = job.querySelector(".interview");
    const rejectBtn = job.querySelector(".reject");
    const deleteBtn = job.querySelector(".delete-btn");
    const status = job.querySelector(".status");

    
    interviewBtn.addEventListener("click", () => {
        if (job.classList.contains("interview")) return;

        if (job.classList.contains("reject")) {
            rejectCount--;
            rejectCountEl.innerText = rejectCount;
        }

        job.classList.remove("reject", "applied");
        job.classList.add("interview");
        status.innerText = "INTERVIEW";

        interviewCount++;
        interviewCountEl.innerText = interviewCount;
    });


    rejectBtn.addEventListener("click", () => {
        if (job.classList.contains("reject")) return;

        if (job.classList.contains("interview")) {
            interviewCount--;
            interviewCountEl.innerText = interviewCount;
        }

        job.classList.remove("interview", "applied");
        job.classList.add("reject");
        status.innerText = "REJECTED";

        rejectCount++;
        rejectCountEl.innerText = rejectCount;
    });


    deleteBtn.addEventListener("click", () => {
        if (job.classList.contains("interview")) {
            interviewCount--;
            interviewCountEl.innerText = interviewCount;
        }
        if (job.classList.contains("reject")) {
            rejectCount--;
            rejectCountEl.innerText = rejectCount;
        }

        totalCount--;
        totalCountEl.innerText = totalCount;
        
        job.remove();

        if (totalCount === 0) {
            emptyMessage.style.display = "block";
        }
    });
}

document.querySelectorAll(".job").forEach(setupJobListeners);

function filterJobs(type) {
    const allJobs = document.querySelectorAll(".job");
    let visibleCount = 0;

    allJobs.forEach(job => {
        if (type === "all") {
            job.style.display = "block";
            visibleCount++;
        } else if (job.classList.contains(type)) {
            job.style.display = "block";
            visibleCount++;
        } else {
            job.style.display = "none";
        }
    });

    emptyMessage.style.display = (visibleCount === 0 && totalCount > 0) ? "block" : (totalCount === 0 ? "block" : "none");
}