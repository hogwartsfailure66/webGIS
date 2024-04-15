const confirmButton = document.querySelector("#confirm");
const instructionButton = document.querySelector("#instruction");
const aboutButton = document.querySelector("#about");
const messageDiv = document.querySelector(".message-card");
const messageContent = document.querySelector(".message");
const backdrop = document.querySelector(".backdrop");

const aboutContent =
  "<h2>Acknowledgments</h2>" +
  "<h3>Data</h3>" +
  "<p>data sources...</p>" +
  "<h3>Libraries</h3>" +
  "<ul>" +
  "<li>ArcGis Online</li>" +
  "<li>...</li>" +
  "<li><a href='https://fontawesome.com/' target='_blank'>Font Awesome</a> for icons</li>" +
  "</ul>";

const instructionContent =
  "<h2>About this project<h2>" +
  "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium debitis corporis deleniti asperiores qui? Repellendus modi maxime explicabo architecto, placeat asperiores, sed, quae numquam deserunt magni assumenda! Commodi, maiores animi?</p>" +
  "<h2>Project Goals</h2>" +
  "<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At cum neque sed quos, dignissimos asperiores, suscipit iste culpa cumque voluptatum ipsa obcaecati perferendis veritatis, sunt architecto modi fugit facilis blanditiis quis. Laborum labore, tempore nesciunt voluptates nihil excepturi vel vitae sunt reprehenderit, ipsa eos dolore asperiores nostrum aspernatur alias placeat deleniti suscipit illum ut, consectetur veritatis provident debitis? Labore, ratione nihil, suscipit, eum ipsum delectus atque nulla commodi fuga adipisci harum explicabo. Mollitia enim similique voluptate tempora, iusto perspiciatis assumenda molestias! Assumenda itaque cum veritatis, delectus quibusdam provident facilis inventore magni soluta aut fuga rerum, harum eum debitis placeat sed?Lorem ipsum dolor, sit amet consectetur adipisicing elit. At cum neque sed quos, dignissimos asperiores, suscipit iste culpa cumque voluptatum ipsa obcaecati perferendis veritatis, sunt architecto modi fugit facilis blanditiis quis. Laborum labore, tempore nesciunt voluptates nihil excepturi vel vitae sunt reprehenderit, ipsa eos dolore asperiores nostrum aspernatur alias placeat deleniti suscipit illum ut, consectetur veritatis provident debitis? Labore, ratione nihil, suscipit, eum ipsum delectus atque nulla commodi fuga adipisci harum explicabo. Mollitia enim similique voluptate tempora, iusto perspiciatis assumenda molestias! Assumenda itaque cum veritatis, delectus quibusdam provident facilis inventore magni soluta aut fuga rerum, harum eum debitis placeat sed?</p>";

const init = () => {
  confirmButton.addEventListener("click", closeMessageDiv);
  instructionButton.addEventListener("click", showInstruction);
  aboutButton.addEventListener("click", showAbout);
  backdrop.addEventListener("click", closeMessageDiv);
};

const closeMessageDiv = () => {
  messageDiv.classList.remove("show");
  backdrop.classList.remove("show");
};

const showInstruction = () => {
  showMessageDiv(instructionContent);
};

const showAbout = () => {
  console.log("about");
  showMessageDiv(aboutContent);
};

const showMessageDiv = (message) => {
  messageContent.innerHTML = message;
  messageDiv.classList.add("show");
  backdrop.classList.add("show");
};

init();
