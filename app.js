/* ==========================================================================
   DevOps & SRE Portfolio JavaScript (English Edition)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Sticky & Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Drawer Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const closeDrawer = document.getElementById('closeDrawer');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-item');

    const openMenu = () => mobileDrawer.classList.add('open');
    const closeMenu = () => mobileDrawer.classList.remove('open');

    menuToggle.addEventListener('click', openMenu);
    closeDrawer.addEventListener('click', closeMenu);
    drawerLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!mobileDrawer.contains(e.target) && !menuToggle.contains(e.target) && mobileDrawer.classList.contains('open')) {
            closeMenu();
        }
    });

    // 3. Stats Metric Counter Animation
    const metrics = document.querySelectorAll('.metric-val');
    const animateMetrics = () => {
        metrics.forEach(metric => {
            const target = parseInt(metric.getAttribute('data-target'));
            const suffix = metric.getAttribute('data-suffix') || '';
            const current = parseInt(metric.innerText);

            if (current === 0) {
                let count = 0;
                const speed = 2000 / target; // Total duration 2 seconds

                const updateCount = () => {
                    if (count < target) {
                        count += Math.ceil(target / 40) || 1;
                        if (count > target) count = target;
                        metric.innerText = count + suffix;
                        setTimeout(updateCount, speed);
                    } else {
                        metric.innerText = target + suffix;
                    }
                };
                updateCount();
            }
        });
    };

    // Trigger metrics animation when section is in view
    const observerOptions = {
        threshold: 0.5
    };

    const metricsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetrics();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        metricsObserver.observe(aboutSection);
    }

    // 4. Contact Info Clipboard Copy Functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-clipboard');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                navigator.clipboard.writeText(targetEl.innerText)
                    .then(() => {
                        const originalText = btn.innerText;
                        btn.innerText = 'Copied!';
                        btn.style.borderColor = 'var(--accent-green)';
                        btn.style.color = 'var(--accent-green)';
                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.style.borderColor = '';
                            btn.style.color = '';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Clipboard copy error: ', err);
                    });
            }
        });
    });

    // 5. Interactive SRE Terminal Simulation
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.getElementById('terminalBody');
    const inputRow = document.getElementById('inputRow');

    // Helper to escape HTML characters to prevent XSS
    const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    };

    // Command History management
    let commandHistory = [];
    let historyIndex = -1;

    // Blog articles placeholder
    let loadedArticles = [];

    // Terminal Commands list & responses
    const commands = {
        help: () => `Available commands:
  <b>about</b>       - Short bio about Enver
  <b>skills</b>      - Core DevOps & SRE skill set
  <b>certs</b>       - Licensed certifications (CKA, CKAD, AWS, etc.)
  <b>experience</b>  - Professional work experience summary
  <b>projects</b>    - Key projects and case studies
  <b>blog</b>        - Latest Medium articles & publications
  <b>contact</b>     - Contact channels and social media
  <b>uptime</b>      - System uptime statistics
  <b>ping</b>        - Mock ping test utility (e.g. ping google.com)
  <b>matrix</b>      - Toggle Matrix code waterfall mode in terminal
  <b>clear</b>       - Clear the console screen`,

        about: () => `<b>Mehmet Enver Akkoç - Tech Lead SRE & DevOps Engineer</b>
--------------------------------------------
Started his career 8 years ago in network security, expanding over time into 
infrastructure automation, container orchestration (Kubernetes), and microservices 
architectures at scale.

Core focus:
* <i>Infrastructure as Code (IaC):</i> Modular and declarative infrastructures (Terraform/Ansible).
* <i>Kubernetes & Cloud Native:</i> High availability microservices management.
* <i>Observability:</i> Advanced logging, metrics, alerting, and MTTR reduction.`,

        skills: () => `<b>Skill Matrix (SRE & DevOps Stack)</b>
--------------------------------------------
[Virtualization & Cloud] vCenter VMware, AWS, GCP
[Orchestration]      Kubernetes, Docker, Helm, Containerd, RKE2
[IaC & Programming]   Terraform, Ansible, Bash Scripting, Python, Go/Golang, YAML
[CI/CD Pipelines]    Jenkins, GitLab CI, ArgoCD, Harbor, Nexus, Bitbucket, SonarQube, Jira, Confluence
[Observability]      Prometheus, Grafana, Thanos, Dynatrace, ELK Stack, Opsgenie, Zabbix
[Databases & Middleware] Redis, Kafka, Nginx, HAProxy
[Security & Storage] Vault, Keycloak, Longhorn, GlusterFS, MinIO`,

        certs: () => `<b>Licenses & Certifications</b>
--------------------------------------------
[CKA]     Certified Kubernetes Administrator
          The Linux Foundation | ID: LF-q6rvuuz90q
[GECEC]   Gremlin Enterprise Chaos Engineering Certified
          Gremlin | ID: 72d93b20-e8d1-46d5-9d35-2b9b9f059315
[AWS]     AWS Certified Cloud Practitioner
          Amazon Web Services
[GitLab]  GitLab Certified Git Associate
          GitLab`,

        experience: () => `<b>Work Experience & Career Summary</b>
--------------------------------------------
<b>[Nov 2025 - Present] Tech Lead SRE / DevOps - T.O.M. Bank</b>
- Leading a team of SREs and DevOps engineers for financial products.
- Evangelized GitOps practices and automated environments with Terraform.

<b>[Nov 2022 - Nov 2025] Senior SRE & DevOps Engineer - T.O.M. Bank</b>
- Handled end-to-end installation, maintenance, and integration of core DevOps/SRE stack technologies.
- Led migration of legacy monolithic systems to Kubernetes and automated continuous delivery.

<b>[Feb 2022 - Nov 2022] Site Reliability Engineer - LC Waikiki</b>
- Managed VM/virtualization (VMware, Azure, GCP) and Rancher Kubernetes cluster transformations.
- Led GitOps integration (ArgoCD & Azure DevOps) and monitoring (Prometheus, Grafana, Zabbix).

<b>[Jul 2021 - Feb 2022] DevOps Engineer - Softtech Bilgi Teknolojileri A.Ş.</b>
- Administered Elastic Stack, optimized EVAM campaign systems, and built Grafana dashboards.

<b>[Oct 2020 - Jul 2021] NOC Engineer - Ebay & Gittigidiyor</b>
- Managed 24/7 system alerts for e-commerce platforms and led incident response workflows.

<b>[Feb 2020 - Oct 2020] DevOps Engineer - Vakıfbank</b>
- Developed internal monitoring systems and distributed batch cron job frameworks.

<b>[Oct 2018 - Jun 2019] Network Security Engineer - Intertech</b>
- Managed firewalls, secure VPN tunnels, HAProxy load balancers, and zoning.`,

        projects: () => `<b>Key Projects & SRE Case Studies</b>
--------------------------------------------
<b>1. FinTech Active-Active K8s Migration</b>
- Active-active two datacenter VMware-based Kubernetes cluster deployment.
- Outcome: Zero downtime migration, 40% resource optimization, and 99.99% uptime.

<b>2. GitOps CI/CD Transformation</b>
- Jenkins, Bitbucket, and ArgoCD setup with Nexus & SonarQube integrations.
- Outcome: Deployment times under 10m, automated rollbacks and code quality gates.

<b>3. Observability & Alerting Refactoring</b>
- Implemented anomaly-based alerting using Thanos, Prometheus, ELK Stack, and Opsgenie.
- Outcome: Alert noise reduced by 90% and MTTR reduced by 70%.`,

        contact: () => `<b>Contact Details</b>
--------------------------------------------
Email:     enver@sre.dev (Use the copy button in contact section)
LinkedIn:  linkedin.com/in/mehmetenverakkoc
GitHub:    github.com/akkoc16`,

        uptime: () => {
            const time = new Date();
            return `up 8 years, 4 months, 12 days, load average: 0.08, 0.04, 0.01
Current local time: ${time.toLocaleDateString('en-US')} ${time.toLocaleTimeString('en-US')}`;
        },

        sudo: () => {
            return `<span class="cmd-err">Permission denied. Nice try! SRE dashboard self-preservation protocol activated.</span>`;
        },

        blog: () => {
            if (loadedArticles.length === 0) {
                return `<b>Latest Medium Articles & Publications</b>\n--------------------------------------------\nNo articles loaded yet. Try visiting the <a href="#blog" style="color: var(--accent-cyan); text-decoration: underline;">Articles section</a> or check back later.`;
            }
            let output = `<b>Latest Medium Articles & Publications</b>\n--------------------------------------------\n`;
            loadedArticles.forEach((art, idx) => {
                const link = art.link || 'https://medium.com';
                output += `${idx + 1}. <b>${art.title}</b>\n   Url: ${link}\n`;
            });
            output += `\nType <b>articles</b> or click the 'Articles' section in the navigation to read them.`;
            return output;
        },

        articles: () => commands.blog()
    };

    // Ping emulation
    const executePing = (inputVal) => {
        const parts = inputVal.split(' ');
        const host = escapeHTML(parts[1] || 'google.com');
        let count = 0;

        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line cmd-output';
        outputLine.innerHTML = `PING ${host} (142.250.187.238) 56(84) bytes of data.<br>`;
        terminalBody.insertBefore(outputLine, inputRow);

        const interval = setInterval(() => {
            if (count < 4) {
                outputLine.innerHTML += `64 bytes from ${host} (142.250.187.238): icmp_seq=${count + 1} ttl=116 time=${(Math.random() * 15 + 5).toFixed(2)} ms<br>`;
                terminalBody.scrollTop = terminalBody.scrollHeight;
                count++;
            } else {
                clearInterval(interval);
                outputLine.innerHTML += `--- ${host} ping statistics ---<br>4 packets transmitted, 4 received, 0% packet loss, time ${3000 + Math.floor(Math.random() * 50)}ms<br>rtt min/avg/max/mdev = 5.23/12.45/21.11/4.22 ms`;
                terminalBody.scrollTop = terminalBody.scrollHeight;
                // re-enable terminal input after async task completes
                terminalInput.removeAttribute('disabled');
                terminalInput.focus();
            }
        }, 600);
    };

    // Terminal Input Event Listener
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputVal = terminalInput.value.trim();
            const cleanInput = inputVal.toLowerCase();

            if (inputVal === '') return;

            // Save to history
            commandHistory.push(inputVal);
            historyIndex = commandHistory.length;

            // Create command echo line
            const echoLine = document.createElement('div');
            echoLine.className = 'terminal-line';
            echoLine.innerHTML = `<span class="terminal-prompt">enver@sre:~#</span> ${escapeHTML(inputVal)}`;
            terminalBody.insertBefore(echoLine, inputRow);

            // Execute command logic
            let output = '';

            if (cleanInput === 'clear') {
                // Clear terminal lines except the input row
                const lines = terminalBody.querySelectorAll('.terminal-line');
                lines.forEach(line => line.remove());
                terminalInput.value = '';
                return;
            } else if (cleanInput === 'matrix') {
                // Matrix easter egg toggle
                terminalBody.classList.toggle('matrix-mode');
                output = terminalBody.classList.contains('matrix-mode')
                    ? 'MATRIX mode enabled. Initiating code waterfall...'
                    : 'MATRIX mode disabled. Returning to standard console.';
            } else if (cleanInput.startsWith('ping')) {
                // Disable input during ping
                terminalInput.setAttribute('disabled', 'true');
                executePing(inputVal);
                terminalInput.value = '';
                return;
            } else if (cleanInput.startsWith('sudo')) {
                output = commands.sudo();
            } else if (commands[cleanInput]) {
                output = commands[cleanInput]();
            } else {
                output = `<span class="cmd-err">Error: Command '${escapeHTML(inputVal)}' not found. Type 'help' for a list of available commands.</span>`;
            }

            // Print output
            const responseLine = document.createElement('div');
            responseLine.className = 'terminal-line cmd-output';
            if (output.includes('cmd-err')) {
                responseLine.className += ' cmd-err';
            }
            responseLine.innerHTML = output;
            terminalBody.insertBefore(responseLine, inputRow);

            // Clear input and scroll down
            terminalInput.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }

        // Command history traversal (Up/Down keys)
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });

    // Auto-focus terminal input on click inside the terminal window
    const terminalWrapper = document.querySelector('.terminal-wrapper');
    if (terminalWrapper) {
        terminalWrapper.addEventListener('click', () => {
            if (!terminalInput.hasAttribute('disabled')) {
                terminalInput.focus();
            }
        });
    }

    // 6. Smooth Scroll navigation
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Medium Blog Integration
    const MEDIUM_USERNAME = 'm.enver.akkoc';
    const blogLoading = document.getElementById('blog-loading');
    const blogGrid = document.getElementById('blog-grid');
    const blogError = document.getElementById('blog-error');

    const fetchMediumArticles = async () => {
        try {
            const feedUrl = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
            const apiUri = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

            const response = await fetch(apiUri);
            if (!response.ok) throw new Error('API fetch failed');

            const data = await response.json();

            if (data.status === 'ok' && data.items && data.items.length > 0) {
                // Filter out replies or comments
                const articles = data.items.filter(item =>
                    item.categories.length > 0 || item.thumbnail || !item.link.includes('/p/')
                ).slice(0, 3);

                if (articles.length > 0) {
                    loadedArticles = articles;
                    renderArticles(articles);
                    return;
                }
            }

            // If API succeeds but returns empty items
            showBlogError();
        } catch (error) {
            console.warn('Could not fetch Medium articles:', error);
            showBlogError();
        }
    };

    const showBlogError = () => {
        if (blogLoading) blogLoading.style.display = 'none';
        if (blogGrid) blogGrid.style.display = 'none';
        if (blogError) blogError.style.display = 'block';
    };

    const renderArticles = (articles) => {
        if (!blogGrid) return;

        blogGrid.innerHTML = '';

        articles.forEach(article => {
            // Clean up description HTML tags for excerpt safely to prevent XSS execution
            const doc = new DOMParser().parseFromString(article.description || '', 'text/html');
            let excerpt = doc.body.textContent || '';
            excerpt = excerpt.trim().substring(0, 140) + '...';

            // Format Date
            // Safely parse date across platforms (safari compatibility)
            let formattedDate = 'Recent';
            if (article.pubDate) {
                const dateStr = article.pubDate.replace(/-/g, "/");
                const dateObj = new Date(dateStr);
                if (!isNaN(dateObj.getTime())) {
                    formattedDate = dateObj.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                }
            }

            // Thumbnail image fallback
            // Extract thumbnail from description or content if not present
            let thumbnail = article.thumbnail;
            if (!thumbnail && article.description) {
                const imgMatch = article.description.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch && imgMatch[1]) {
                    thumbnail = imgMatch[1];
                }
            }
            if (!thumbnail && article.content) {
                const imgMatch = article.content.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch && imgMatch[1]) {
                    thumbnail = imgMatch[1];
                }
            }
            if (!thumbnail) {
                thumbnail = 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80';
            }

            // Tags/Categories
            const tags = article.categories && article.categories.length > 0 ? article.categories : ['DevOps', 'SRE'];
            const tagsMarkup = tags
                .slice(0, 3)
                .map(tag => `<span class="blog-tag">${escapeHTML(tag)}</span>`)
                .join('');

            const card = document.createElement('div');
            card.className = 'blog-card glass-panel';
            card.innerHTML = `
                <img src="${escapeHTML(thumbnail)}" alt="${escapeHTML(article.title)}" class="blog-card-image" loading="lazy">
                <div class="blog-card-content">
                    <div class="blog-card-meta">
                        <span class="blog-card-date">${formattedDate}</span>
                    </div>
                    <h3 class="blog-card-title">
                        <a href="${escapeHTML(article.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(article.title)}</a>
                    </h3>
                    <p class="blog-card-excerpt">${excerpt}</p>
                    <div class="blog-card-footer">
                        <div class="blog-tags">
                            ${tagsMarkup}
                        </div>
                        <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="blog-read-more">
                            Read Post 
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            `;
            blogGrid.appendChild(card);
        });

        if (blogLoading) blogLoading.style.display = 'none';
        if (blogError) blogError.style.display = 'none';
        blogGrid.style.display = 'grid';
    };

    fetchMediumArticles();
});
