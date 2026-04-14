const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const gallerySlides = [
  {
    src: "img/phenopad/slides/slide0.png",
    alt: "PhenoPad overview screen",
    caption: "Overview screen for a clinical encounter."
  },
  {
    src: "img/phenopad/slides/slide1.png",
    alt: "PhenoPad note-taking screen",
    caption: "Free-form note-taking with clinician review."
  },
  {
    src: "img/phenopad/slides/slide2.png",
    alt: "PhenoPad phenotype list",
    caption: "Recognized phenotypes stay visible for quick validation."
  },
  {
    src: "img/phenopad/slides/slide3.png",
    alt: "PhenoPad transcript screen",
    caption: "Speech transcripts support review during and after the visit."
  },
  {
    src: "img/phenopad/slides/slide4.png",
    alt: "PhenoPad decision support screen",
    caption: "Clinical support updates as new phenotypes are confirmed."
  },
  {
    src: "img/phenopad/slides/slide5.png",
    alt: "PhenoPad annotation screen",
    caption: "Images, photos, and drawings can be added into the note."
  },
  {
    src: "img/phenopad/slides/slide6.png",
    alt: "PhenoPad note generation screen",
    caption: "Captured material helps create more complete encounter notes."
  }
];

const featureTabs = {
  handwriting: {
    kicker: "Handwriting Recognition",
    title: "Write naturally. Review recognized text immediately.",
    copy: "PhenoPad recognizes handwritten lines in real time, shows candidate words, expands abbreviations, and surfaces phenotype tags for quick confirmation.",
    points: [
      "Medical language model for handwritten notes",
      "Correction options directly above the writing",
      "Phenotype tags with present and absent states"
    ],
    video: "vid/hwr.mp4",
    poster: "img/phenopad/hwr/hwr.jpg"
  },
  speech: {
    kicker: "Speech Recognition",
    title: "Capture conversation context without forcing dictation.",
    copy: "Audio can be processed into speaker-aware transcripts and saved for later review, so clinicians can recover details that were not written down.",
    points: [
      "Speaker-aware transcript view",
      "Saved conversations for later reference",
      "Clinical term detection from speech"
    ],
    video: "vid/speech.mp4",
    poster: "img/phenopad/speech/speech1.png"
  },
  nlp: {
    kicker: "Medical NLP",
    title: "Turn notes and transcripts into structured clinical cues.",
    copy: "Medical terms, abbreviation meanings, and candidate phenotypes are extracted from the visit material and shown where clinicians can validate them.",
    points: [
      "Abbreviation disambiguation from local context",
      "Phenotype search from selected note text",
      "Reusable structured clinical information"
    ],
    video: "vid/ManualVids_edited/hw24.mp4",
    poster: "img/phenopad/hwr/nlphwr.jpg"
  },
  support: {
    kicker: "Clinical Decision Support",
    title: "Use confirmed phenotypes to guide the next question.",
    copy: "As phenotypes are confirmed, PhenoPad suggests related phenotypes and differential diagnosis references for clinician review.",
    points: [
      "Phenotype suggestions from selected findings",
      "Differential diagnosis reference list",
      "Overview panel for saved clinical evidence"
    ],
    video: "vid/cds.mp4",
    poster: "img/phenopad/cds/cds3.jpg"
  }
};

const demoItems = [
  {
    id: "handwriting",
    title: "Taking notes by hand",
    copy: "Phenotypes and recognition results appear while the clinician writes, keeping review close to the original stroke.",
    src: "vid/ManualVids_edited/hw1.mov"
  },
  {
    id: "handwriting",
    title: "Top phenotype bar",
    copy: "Recognized phenotypes and candidates are collected in a compact panel for quick review.",
    src: "vid/ManualVids_edited/hw2.mov"
  },
  {
    id: "handwriting",
    title: "Abbreviation expansion",
    copy: "Potential abbreviation meanings are shown inline and can be changed by the clinician.",
    src: "vid/ManualVids_edited/hw3.mov"
  },
  {
    id: "handwriting",
    title: "Candidate correction",
    copy: "When recognition misses a word, alternatives can be selected manually.",
    src: "vid/ManualVids_edited/hw5.mov"
  },
  {
    id: "support",
    title: "Support side panel",
    copy: "Saved phenotypes, suggestions, and disease predictions stay available in the side panel.",
    src: "vid/ManualVids_edited/hw8.mov"
  },
  {
    id: "text",
    title: "Review recognized text",
    copy: "Toggle between raw writing and recognized text to revise the note.",
    src: "vid/ManualVids_edited/hw23.mp4"
  },
  {
    id: "text",
    title: "Text alternatives",
    copy: "Tap words in edit mode to choose alternatives or analyze phrases for phenotypes.",
    src: "vid/ManualVids_edited/hw24.mp4"
  },
  {
    id: "text",
    title: "Manual text revision",
    copy: "Type or write corrected text when automatic candidates are not enough.",
    src: "vid/ManualVids_edited/hw25.mp4"
  },
  {
    id: "records",
    title: "Import history records",
    copy: "Start from existing records, imported from a file or pasted text.",
    src: "vid/ManualVids_edited/hw9.mov"
  },
  {
    id: "records",
    title: "Annotate records",
    copy: "Underline text, add comments, and keep annotations anchored to the original position.",
    src: "vid/ManualVids_edited/hw29.mov"
  },
  {
    id: "records",
    title: "Insert new content",
    copy: "Tap between words to insert typed or handwritten material into the record.",
    src: "vid/ManualVids_edited/hw28.mov"
  },
  {
    id: "records",
    title: "Delete and highlight",
    copy: "Scratch out outdated text or highlight important findings with pen gestures.",
    src: "vid/ManualVids_edited/hw15.mov"
  },
  {
    id: "addin",
    title: "Add drawings and photos",
    copy: "Draw a square to add drawings, images, or photos into the note.",
    src: "vid/ManualVids_edited/hw20.mov"
  },
  {
    id: "addin",
    title: "Annotate media",
    copy: "Photos and images can be annotated and minimized into the side panel.",
    src: "vid/ManualVids_edited/hw21.mov"
  }
];

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 16);
}

function setupNavigation() {
  if (!nav || !navToggle) return;

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
    header?.classList.toggle("nav-active", isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    header?.classList.remove("nav-active");
  });
}

function setupGallery() {
  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const image = gallery.querySelector("[data-gallery-image]");
  const caption = gallery.querySelector("[data-gallery-caption]");
  const dots = gallery.querySelector("[data-gallery-dots]");
  const previous = gallery.querySelector("[data-gallery-prev]");
  const next = gallery.querySelector("[data-gallery-next]");
  let index = 0;

  function render() {
    const slide = gallerySlides[index];
    image.src = slide.src;
    image.alt = slide.alt;
    caption.textContent = slide.caption;
    dots.querySelectorAll("button").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
  }

  gallerySlides.forEach((slide, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show ${slide.caption}`);
    dot.addEventListener("click", () => {
      index = slideIndex;
      render();
    });
    dots.appendChild(dot);
  });

  previous.addEventListener("click", () => {
    index = (index - 1 + gallerySlides.length) % gallerySlides.length;
    render();
  });
  next.addEventListener("click", () => {
    index = (index + 1) % gallerySlides.length;
    render();
  });

  render();
}

function setupFeatureTabs() {
  const tabs = document.querySelector("[data-tabs]");
  if (!tabs) return;

  const buttons = [...tabs.querySelectorAll("[data-tab]")];
  const kicker = tabs.querySelector("[data-tab-kicker]");
  const title = tabs.querySelector("[data-tab-title]");
  const copy = tabs.querySelector("[data-tab-copy]");
  const list = tabs.querySelector("[data-tab-list]");
  const video = tabs.querySelector("[data-tab-video]");

  function activate(key) {
    const content = featureTabs[key];
    if (!content) return;

    buttons.forEach((button) => {
      const active = button.dataset.tab === key;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });

    kicker.textContent = content.kicker;
    title.textContent = content.title;
    copy.textContent = content.copy;
    list.innerHTML = "";
    content.points.forEach((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      list.appendChild(item);
    });
    video.poster = content.poster;
    video.querySelector("source").src = content.video;
    video.load();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => activate(button.dataset.tab));
  });
}

function setupLightbox() {
  const dialog = document.querySelector("[data-lightbox-dialog]");
  if (!dialog) return;

  const image = dialog.querySelector("[data-lightbox-image]");
  const title = dialog.querySelector("[data-lightbox-title]");
  const close = dialog.querySelector("[data-lightbox-close]");

  document.querySelectorAll("[data-lightbox]").forEach((button) => {
    button.addEventListener("click", () => {
      image.src = button.dataset.lightbox;
      image.alt = button.dataset.title || "PhenoPad image preview";
      title.textContent = button.dataset.title || "";
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    });
  });

  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function setupDemoPlayer() {
  const list = document.querySelector("[data-demo-list]");
  const video = document.querySelector("[data-demo-video]");
  if (!list || !video) return;

  const title = document.querySelector("[data-demo-title]");
  const copy = document.querySelector("[data-demo-copy]");
  const source = video.querySelector("source");

  function playItem(item, card) {
    title.textContent = item.title;
    copy.textContent = item.copy;
    source.src = item.src;
    video.load();
    video.play().catch(() => {});
    list.querySelectorAll(".demo-card").forEach((entry) => entry.classList.remove("active"));
    card?.classList.add("active");
  }

  demoItems.forEach((item, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "demo-card";
    card.dataset.group = item.id;
    card.innerHTML = `<strong>${item.title}</strong><span>${item.copy}</span>`;
    card.addEventListener("click", () => playItem(item, card));
    list.appendChild(card);
    if (index === 0) card.classList.add("active");
  });

  document.querySelectorAll("[data-demo-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.demoPick;
      const card = list.querySelector(`.demo-card[data-group="${group}"]`);
      const item = demoItems.find((entry) => entry.id === group);
      if (item && card) playItem(item, card);
      document.querySelector(".demo-player")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
setupNavigation();
setupGallery();
setupFeatureTabs();
setupLightbox();
setupDemoPlayer();
