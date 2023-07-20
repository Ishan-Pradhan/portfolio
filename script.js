"use stricts";

document
  .querySelector(".nav-links-container")
  .addEventListener("click", function (e) {
    console.log(e.target);

    //matching strategy
    if (e.target.classList.contains("nav-link")) {
      e.preventDefault();
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

document.querySelector(".download-cv").addEventListener("click", function () {
  alert(
    "📝 Whoops, no CV at the moment! But don't worry, I'm busy crafting one. Soon, my fabulous CV will be ready to impress employers! 🛠️🚀 Stay tuned for greatness! 😄"
  );
});
