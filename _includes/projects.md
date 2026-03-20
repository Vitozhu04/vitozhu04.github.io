<h2 id="projects" style="margin: 2px 0px -15px;">Projects</h2>

<h4 style="margin:10px 0 8px;">Research Code</h4>
<div class="projects-grid">
{% for project in site.data.projects.research %}
<div class="project-card">
  <div class="project-card__header">
    <a href="{{ project.slug }}/" class="project-card__title">{{ project.title }}</a>
    {% if project.conference %}<span class="project-card__badge">{{ project.conference }}</span>{% endif %}
    {% if project.stars %}<span class="project-card__stars">&#9733; {{ project.stars }}</span>{% endif %}
  </div>
  <p class="project-card__desc">{{ project.description }}</p>
  <div class="project-card__tech">
    {% for t in project.tech %}<span class="project-card__tag">{{ t }}</span>{% endfor %}
  </div>
  <div class="project-card__links">
    <a href="{{ project.github }}" target="_blank" rel="noopener" class="btn btn-sm z-depth-0" style="font-size:12px;">GitHub</a>
    {% if project.demo %}<a href="{{ project.demo }}" target="_blank" rel="noopener" class="btn btn-sm z-depth-0" style="font-size:12px;">Demo</a>{% endif %}
  </div>
</div>
{% endfor %}
</div>

<h4 style="margin:10px 0 8px;">Personal / Side Projects</h4>
<div class="projects-grid">
{% for project in site.data.projects.personal %}
<div class="project-card">
  <div class="project-card__header">
    <a href="{{ project.slug }}/" class="project-card__title">{{ project.title }}</a>
  </div>
  <p class="project-card__desc">{{ project.description }}</p>
  <div class="project-card__tech">
    {% for t in project.tech %}<span class="project-card__tag">{{ t }}</span>{% endfor %}
  </div>
  <div class="project-card__links">
    <a href="{{ project.github }}" target="_blank" rel="noopener" class="btn btn-sm z-depth-0" style="font-size:12px;">GitHub</a>
    {% if project.demo %}<a href="{{ project.demo }}" target="_blank" rel="noopener" class="btn btn-sm z-depth-0" style="font-size:12px;">Demo</a>{% endif %}
  </div>
</div>
{% endfor %}
</div>

<style>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin: 12px 0 20px;
}
.project-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  transition: box-shadow 0.2s;
}
.project-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.project-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.project-card__title {
  font-weight: 600;
  font-size: 1.05rem;
  color: #0366d6;
  text-decoration: none;
}
.project-card__title:hover {
  text-decoration: underline;
}
.project-card__badge {
  display: inline-block;
  padding: 1px 8px;
  background: #0366d6;
  color: #fff;
  border-radius: 4px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}
.project-card__stars {
  font-size: 0.78rem;
  color: #e3b341;
  font-weight: 500;
}
.project-card__desc {
  font-size: 0.88rem;
  color: #555;
  line-height: 1.55;
  margin-bottom: 10px;
}
.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 10px;
}
.project-card__tag {
  display: inline-block;
  padding: 1px 7px;
  background: #f0f4f8;
  color: #555;
  border-radius: 4px;
  font-size: 0.7rem;
}
.project-card__links {
  display: flex;
  gap: 6px;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .project-card { border-color: #333; }
  .project-card:hover { box-shadow: 0 2px 12px rgba(255,255,255,0.05); }
  .project-card__title { color: #58a6ff; }
  .project-card__badge { background: #58a6ff; color: #000; }
  .project-card__desc { color: #aaa; }
  .project-card__tag { background: #1c2128; color: #8b949e; }
}
</style>
