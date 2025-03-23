import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animação para cards de serviço
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(card);
});

// Função para carregar notícias
async function loadNews() {
    try {
        const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
            params: {
                country: 'br',
                lang: 'pt',
                apikey: '8248187418e14ff5e89cc8cbe822b7dd',
                max: 4
            }
        });

        const newsContainer = document.querySelector('#news-container');
        if (newsContainer && response.data.articles) {
            newsContainer.innerHTML = response.data.articles
                .map(article => `
                    <div class="col-md-6 mb-4">
                        <div class="news-card">
                            <div class="card">
                                <img src="${article.image || 'https://via.placeholder.com/600x300'}" 
                                     class="card-img-top" 
                                     alt="${article.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${article.title}</h5>
                                    <p class="card-text">${article.description || ''}</p>
                                    <p class="text-muted">
                                        <small>Publicado em ${new Date(article.publishedAt).toLocaleDateString('pt-BR')}</small>
                                    </p>
                                    <a href="${article.url}" target="_blank" class="btn btn-primary">Ler mais</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
        }
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        // Adicionar mensagem de erro para o usuário
        const newsContainer = document.querySelector('#news-container');
        if (newsContainer) {
            newsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-warning" role="alert">
                        Não foi possível carregar as notícias no momento. Por favor, tente novamente mais tarde.
                    </div>
                </div>
            `;
        }
    }
}

// Carregar notícias quando a página carregar
document.addEventListener('DOMContentLoaded', loadNews);