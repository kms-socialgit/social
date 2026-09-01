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

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "2026 태안 계모임 좌대낚시·트루디펜션 확정 일정",
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
