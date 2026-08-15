const caseNames = {
  1: "케이스 1 · 남용호 좌대낚시 + 트루디펜션",
  2: "케이스 2 · 연계 선상낚시 + 트루디펜션",
  3: "케이스 3 · 피싱게이트 선상낚시 + 숙박 패키지",
};

const pickButtons = document.querySelectorAll("[data-pick]");
const selectedResult = document.querySelector("#selectedResult");
const shareButton = document.querySelector("#shareButton");
const toast = document.querySelector("#toast");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function applySelection(caseId, announce = false) {
  document.querySelectorAll(".case-card").forEach((card) => {
    card.classList.toggle("is-picked", card.dataset.case === caseId);
  });

  pickButtons.forEach((button) => {
    const isSelected = button.dataset.pick === caseId;
    button.textContent = isSelected ? "현재 선택한 후보" : "이 안을 후보로 선택";
    button.setAttribute("aria-pressed", String(isSelected));
  });

  if (caseId && caseNames[caseId]) {
    selectedResult.textContent = `현재 선택: ${caseNames[caseId]}`;
    if (announce) showToast(`${caseNames[caseId]}를 선택했습니다.`);
  } else {
    selectedResult.textContent = "아직 선택한 후보가 없습니다.";
  }
}

pickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const caseId = button.dataset.pick;
    localStorage.setItem("taean-trip-choice", caseId);
    applySelection(caseId, true);
  });
});

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "2026 태안 계모임 낚시·숙박 세 가지 일정 비교",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showToast("페이지 주소를 복사했습니다.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      showToast("주소를 복사하지 못했습니다.");
    }
  }
});

applySelection(localStorage.getItem("taean-trip-choice"));
