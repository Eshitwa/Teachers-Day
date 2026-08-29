/*
  EDIT THIS FILE FOR EACH TEACHER.
  Duplicate the HTML folder/page and change only this object + data-theme.
*/
const TEACHER = {
  name: "Mr. Vishal",
  subject: "Physics",
  theme: "physics",
  joined: "2025",
  experience: "02 years",
  quote: "Curiosity is where every discovery begins."
};

/* Subject presets — useful if you want to clone this page five times. */
const SUBJECTS = {
  physics:      { subject: "Physics",      code: "PHY" },
  english:      { subject: "English",      code: "ENG" },
  mathematics:  { subject: "Mathematics",  code: "MAT" },
  chemistry:    { subject: "Chemistry",    code: "CHE" },
  ai:           { subject: "AI",           code: "AI" }
};

document.documentElement.dataset.theme = TEACHER.theme;
document.title = `Happy Teacher's Day — ${TEACHER.name}`;

document.querySelectorAll("[data-teacher-name]").forEach(el => el.textContent = TEACHER.name);
document.querySelectorAll("[data-teacher-subject]").forEach(el => el.textContent = TEACHER.subject.toUpperCase());
document.querySelectorAll("[data-teacher-joined]").forEach(el => el.textContent = TEACHER.joined);
document.querySelectorAll("[data-teacher-experience]").forEach(el => el.textContent = TEACHER.experience);


const code = SUBJECTS[TEACHER.theme]?.code || TEACHER.subject.slice(0, 3).toUpperCase();
const codeEl = document.querySelector("[data-teacher-code]");
if (codeEl) codeEl.textContent = `${code}-${TEACHER.joined}`;
