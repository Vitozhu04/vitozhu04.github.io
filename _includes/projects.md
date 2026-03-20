<h2 id="projects" style="margin: 2px 0px -15px;">Projects</h2>

<h4 style="margin:10px 10px 5px;">Research Code</h4>
<table class="projects-table">
{% for project in site.data.projects.research %}
<tr>
  <td class="proj-name">
    <a href="{{ project.slug }}/">{{ project.title }}</a>
    {% if project.conference %}<abbr class="badge">{{ project.conference }}</abbr>{% endif %}
  </td>
  <td class="proj-desc">{{ project.description }}</td>
  <td class="proj-links">
    {% if project.stars %}<span class="proj-stars">&#9733; {{ project.stars }}</span>{% endif %}
    <a href="{{ project.github }}" target="_blank" rel="noopener" class="btn btn-sm z-depth-0" style="font-size:12px;">Code</a>
    {% if project.demo %}<a href="{{ project.demo }}" target="_blank" rel="noopener" class="btn btn-sm z-depth-0" style="font-size:12px;">Demo</a>{% endif %}
  </td>
</tr>
{% endfor %}
</table>

<h4 style="margin:10px 10px 5px;">Side Projects</h4>
<ul class="side-projects-list">
{% for project in site.data.projects.personal %}
<li>
  {% if project.url %}<a href="{{ project.url }}" target="_blank" rel="noopener"><strong>{{ project.title }}</strong></a>{% else %}<strong>{{ project.title }}</strong>{% endif %}
  — {{ project.description }}
  {% if project.note %}<em style="color:#e74d3c;">({{ project.note }})</em>{% endif %}
</li>
{% endfor %}
</ul>

<style>
.projects-table {
  width: 100%;
  border-collapse: collapse;
  margin: 4px 0 16px;
}
.projects-table tr {
  border-bottom: 1px solid #eee;
}
.projects-table tr:last-child {
  border-bottom: none;
}
.projects-table td {
  padding: 8px 6px;
  vertical-align: top;
  font-size: 0.88rem;
}
.proj-name {
  white-space: nowrap;
  font-weight: 600;
  width: 1%;
  padding-right: 10px !important;
}
.proj-name a {
  color: #0366d6;
  text-decoration: none;
}
.proj-name a:hover {
  text-decoration: underline;
}
.proj-name .badge {
  font-size: 0.6rem;
  vertical-align: middle;
  margin-left: 4px;
}
.proj-desc {
  color: #555;
  line-height: 1.5;
}
.proj-links {
  white-space: nowrap;
  width: 1%;
  text-align: right;
}
.proj-stars {
  font-size: 0.78rem;
  color: #e3b341;
  font-weight: 500;
  margin-right: 4px;
}

.side-projects-list {
  margin: 4px 0 16px;
  padding-left: 1.4rem;
}
.side-projects-list li {
  margin-bottom: 4px;
  font-size: 0.88rem;
  color: #555;
  line-height: 1.55;
}
.side-projects-list a {
  color: #0366d6;
  text-decoration: none;
}
.side-projects-list a:hover {
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  .projects-table tr { border-color: #333; }
  .proj-name a { color: #58a6ff; }
  .proj-desc { color: #aaa; }
  .side-projects-list li { color: #aaa; }
  .side-projects-list a { color: #58a6ff; }
}
@media (max-width: 768px) {
  .proj-desc { display: none; }
}
</style>
