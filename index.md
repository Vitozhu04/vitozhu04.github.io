---
layout: homepage
---

{::options parse_block_html="true" /}

<!-- ══ About ══ -->
<section class="chapter" data-section="about" aria-label="About">
<span class="chapter__counter">01 — About</span>
<p class="chapter__label">About</p>
<div class="chapter__headline-clip">
<span class="chapter__headline">Wenbo<br>(Vito) Zhu</span>
</div>
<div class="chapter__divider"></div>
<div class="chapter__body">

Hello! I'm **Wenbo (Vito) Zhu**, currently the **Founding AI Lead & Head of AI Research** at [OpusClip](https://www.opusclip.com).
I joined when the team had around 5 engineers, failed and pivoted, and now lead a **30+ cross-functional AI team** delivering next-generation multimodal and generative video products.
I initiated, led, and shipped several flagship systems, including:

- [OpusClip](https://www.opus.pro/) – No.1 AI Clipping Tool in the market
- [ClipAnything](https://www.opus.pro/clipanything) – First multi-modal clipping tool with prompting capabilities
- [Agent Opus](https://www.opus.pro/agent) – First video agent tailored for social media

Before OpusClip, I was a **Senior ML Engineer at ByteDance/TikTok**, where I served as a founding engineer of [Gauthmath](https://www.gauthmath.com/) — building the world's first AI-based geometry solver with 100M+ downloads.
Earlier, as a **Research Scientist at Cloudwalk Technology**, I developed a **billion-scale face clustering engine** deployed across 10+ cities (patented).

- **Recognition:** Both **OpusClip** and **Gauthmath** were recognized by *Andreessen Horowitz (a16z)* as **Top 50 GenAI Apps**.
- **Leadership:** I founded the [Opus AI Research Team](https://opusair.github.io/), the research team at OpusClip.
- **Collaboration:** I work with <a href="https://yxpalmweb.github.io/" target="_blank" rel="noopener" style="color: rgb(62, 183, 240);">Prof. Xu Yang</a> on multimodal video intelligence and robust vision-language alignment.
- **Education:** I hold a **Master (OR)** from [UC Berkeley](https://engineering.berkeley.edu/) and an **Undergrad (IE & Math)** from [Beihang University](https://ev.buaa.edu.cn/).

</div>
</section>

<!-- ══ Career ══ -->
<section class="chapter chapter--alt" data-section="career" aria-label="Career">
<span class="chapter__counter">02 — Career</span>
<p class="chapter__label">Career</p>
<div class="chapter__headline-clip">
<span class="chapter__headline">Timeline</span>
</div>
<div class="chapter__divider"></div>
<div class="chapter__body">
<ul class="timeline">
<li class="timeline-item">
<span class="timeline-item__year">2022 – Present</span>
<div class="timeline-item__content"><strong>Founding AI Lead &amp; Head of AI Research</strong><p>OpusClip</p></div>
</li>
<li class="timeline-item">
<span class="timeline-item__year">2020 – 2022</span>
<div class="timeline-item__content"><strong>Senior ML Engineer</strong><p>ByteDance / TikTok</p></div>
</li>
<li class="timeline-item">
<span class="timeline-item__year">2019 – 2020</span>
<div class="timeline-item__content"><strong>Research Scientist</strong><p>Cloudwalk Technology</p></div>
</li>
</ul>
</div>
</section>

<!-- ══ Research ══ -->
<section class="chapter" data-section="research" aria-label="Research Interests">
<span class="chapter__counter">03 — Research</span>
<p class="chapter__label">Research</p>
<div class="chapter__headline-clip">
<span class="chapter__headline">Interests</span>
</div>
<div class="chapter__divider"></div>
<div class="chapter__body">
<div class="research-tiles">
<div class="research-tile">
<strong>Multimodal Video Intelligence</strong>
<p>Understanding, reasoning, and editing for video content</p>
</div>
<div class="research-tile">
<strong>Agentic Systems</strong>
<p>LLM-based planning, tool use, and evaluation frameworks</p>
</div>
<div class="research-tile">
<strong>Generative Media</strong>
<p>Automatic video repurposing and multimodal content creation</p>
</div>
</div>
</div>
</section>

<!-- ══ News ══ -->
<section class="chapter chapter--alt" data-section="news" aria-label="News">
<span class="chapter__counter">04 — News</span>
<p class="chapter__label">News</p>
<div class="chapter__headline-clip">
<span class="chapter__headline">Updates</span>
</div>
<div class="chapter__divider"></div>
<div class="chapter__body">
<ul class="news-list">
<li class="news-item"><span class="news-date">Jan 2026</span><span class="news-text">One paper is accepted by <strong>ICLR 2026</strong>.</span></li>
<li class="news-item"><span class="news-date">Sep 2025</span><span class="news-text">Two papers accepted by <strong>NeurIPS 2025</strong>.</span></li>
<li class="news-item"><span class="news-date">May 2025</span><span class="news-text">One paper accepted to <strong>ACL 2025</strong>.</span></li>
<li class="news-item"><span class="news-date">Feb 2025</span><span class="news-text">Two papers accepted to <strong>CVPR 2025</strong>, including <strong>One Highlight</strong>.</span></li>
<li class="news-item"><span class="news-date">Jan 2025</span><span class="news-text">One journal paper accepted to <strong>BIT</strong>.</span></li>
<li class="news-item"><span class="news-date">Dec 2024</span><span class="news-text">Two papers accepted to <strong>AAAI 2025</strong>.</span></li>
<li class="news-item"><span class="news-date">Nov 2024</span><span class="news-text">Co-authored an article with <strong>Google AI team</strong> on <strong>Gemini Flash</strong>: <em>"<a href="https://ai.google.dev/showcase/opusclip">OpusClip achieves 30% cost savings with Gemini Flash</a>"</em> (Google AI Showcase).</span></li>
<li class="news-item"><span class="news-date">Feb 2024</span><span class="news-text">One journal paper accepted to <strong>IJHCI</strong>.</span></li>
</ul>
</div>
</section>

<!-- ══ Publications — GSAP card stack ══ -->
<section class="scene--publications" data-section="publications" aria-label="Publications">
<div class="pub-stack">

{% for pub in site.data.publications.main %}
<div class="pub-card">
<div class="pub-card__left">
<div class="pub-card__badges">
{% if pub.conference_short %}<span class="pub-card__badge">{{ pub.conference_short }}</span>{% endif %}
{% if pub.notes %}<span class="pub-card__highlight">{{ pub.notes }}</span>{% endif %}
</div>
<h3 class="pub-card__title">{{ pub.title }}</h3>
<p class="pub-card__authors">{{ pub.authors }}</p>
<p class="pub-card__venue">{{ pub.conference }}</p>
{% if pub.others %}<p class="pub-card__others">{{ pub.others }}</p>{% endif %}
<div class="pub-card__links">
{% if pub.pdf %}<a href="{{ pub.pdf }}" class="pub-card__btn" target="_blank" rel="noopener">PDF</a>{% endif %}
{% if pub.code %}<a href="{{ pub.code }}" class="pub-card__btn" target="_blank" rel="noopener">Code</a>{% endif %}
{% if pub.page %}<a href="{{ pub.page }}" class="pub-card__btn" target="_blank" rel="noopener">Project</a>{% endif %}
{% if pub.bibtex %}<a href="{{ pub.bibtex }}" class="pub-card__btn" target="_blank" rel="noopener">BibTeX</a>{% endif %}
</div>
</div>
<div class="pub-card__right">
{% if pub.image %}<img src="{{ pub.image }}" alt="{{ pub.title }}" class="pub-card__image" loading="lazy">{% endif %}
</div>
</div>
{% endfor %}

</div>
</section>

<!-- ══ Awards ══ -->
<section class="chapter" data-section="awards" aria-label="Competition and Awards">
<span class="chapter__counter">06 — Awards</span>
<p class="chapter__label">Awards</p>
<div class="chapter__headline-clip">
<span class="chapter__headline">Competition<br>&amp; Awards</span>
</div>
<div class="chapter__divider"></div>
<div class="chapter__body">
<ul class="awards-list">
<li class="award-item award-item--silver"><span class="award-item__medal">🥈</span><div class="award-item__text"><strong>[Oct 2025]</strong> 2nd Place – <strong>Perception Test Challenge 2025</strong> (Task 5: Hour-Long Video QA)</div></li>
<li class="award-item award-item--bronze"><span class="award-item__medal">🥉</span><div class="award-item__text"><strong>[Aug 2025]</strong> 3rd Place – <strong>CVPR 2025 SoccerNet Challenge</strong> (Multi-View Foul Recognition)</div></li>
<li class="award-item award-item--gold"><span class="award-item__medal">🥇</span><div class="award-item__text"><strong>[Jun 2025]</strong> 1st Place – <strong>CVPR 2025 VidLLMs Challenge</strong> (Multilingual Video Reasoning)</div></li>
<li class="award-item award-item--silver"><span class="award-item__medal">🥈</span><div class="award-item__text"><strong>[Jun 2025]</strong> 2nd Place – <strong>CVPR 2025 VidLLMs Challenge</strong> (Complex Video Reasoning &amp; Robustness)</div></li>
<li class="award-item award-item--gold"><span class="award-item__medal">🏆</span><div class="award-item__text"><strong>[Oct 2024]</strong> Winner – <strong>ECCV 2024 Perception Challenge</strong> (Hour-Long Video QA Track)</div></li>
<li class="award-item award-item--gold"><span class="award-item__medal">🏆</span><div class="award-item__text"><strong>[Jun 2024]</strong> Winner – <strong>CVPR 2024 LOVEU Workshop</strong> (Long-Term Video QA Track)</div></li>
<li class="award-item award-item--silver"><span class="award-item__medal">🥈</span><div class="award-item__text"><strong>[2020]</strong> Kaggle ASHRAE Great Energy Predictor III – Silver Medal (Top 2%)</div></li>
</ul>
</div>
</section>

<!-- ══ Services + Contact Footer ══ -->
<section class="scene--services-footer" data-section="services" aria-label="Services and Contact">

<h2>Services</h2>

<h4>Conference Reviewers</h4>
<ul>
<li><a href="https://cvpr.thecvf.com/Conferences/2026">IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) 2026</a></li>
<li><a href="https://eccv.ecva.net/">European Conference on Computer Vision (ECCV) 2026</a></li>
<li><a href="https://aaai.org/conference/aaai/aaai-25/">AAAI Conference on Artificial Intelligence (AAAI) 2025</a></li>
</ul>

<div class="contact-block">
<h3>Get in Touch</h3>
<a href="mailto:{{ site.email }}" class="contact-block__email">{{ site.email }}</a>
<div class="contact-block__social">
{% if site.google_scholar %}<a href="{{ site.google_scholar }}" aria-label="Google Scholar" target="_blank" rel="noopener"><i class="ai ai-google-scholar"></i></a>{% endif %}
{% if site.cv_link %}<a href="{{ site.cv_link }}" aria-label="CV" target="_blank" rel="noopener"><i class="ai ai-cv"></i></a>{% endif %}
{% if site.github_link %}<a href="{{ site.github_link }}" aria-label="GitHub" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>{% endif %}
{% if site.linkedin %}<a href="{{ site.linkedin }}" aria-label="LinkedIn" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i></a>{% endif %}
</div>
</div>

</section>
