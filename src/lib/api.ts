// Generic API client for BigO Lens Admin Panel
// Update the BASE_URL and endpoints to match your actual API

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.bigolens.com';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('admin_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;
    
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const token = this.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Analytics endpoints
  async getLensSearchAnalytics(params?: any) {
    return this.request('/analytics/lens-search', { method: 'GET' });
  }

  async getLensTagAnalytics(params?: any) {
    return this.request('/analytics/lens-tag', { method: 'GET' });
  }

  async getLensVTOAnalytics(params?: any) {
    return this.request('/analytics/lens-vto', { method: 'GET' });
  }

  // Companies endpoints
  async getCompanies(params?: any) {
    return this.request('/companies', { method: 'GET' });
  }

  async getCompany(id: string) {
    return this.request(`/companies/${id}`, { method: 'GET' });
  }

  async createCompany(data: any) {
    return this.request('/companies', { method: 'POST', body: data });
  }

  async updateCompany(id: string, data: any) {
    return this.request(`/companies/${id}`, { method: 'PUT', body: data });
  }

  async deleteCompany(id: string) {
    return this.request(`/companies/${id}`, { method: 'DELETE' });
  }

  async getCompanyAnalytics(id: string) {
    return this.request(`/companies/${id}/analytics`, { method: 'GET' });
  }

  // Blog endpoints
  async getBlogs(params?: any) {
    return this.request('/blogs', { method: 'GET' });
  }

  async getBlog(id: string) {
    return this.request(`/blogs/${id}`, { method: 'GET' });
  }

  async createBlog(data: any) {
    return this.request('/blogs', { method: 'POST', body: data });
  }

  async updateBlog(id: string, data: any) {
    return this.request(`/blogs/${id}`, { method: 'PUT', body: data });
  }

  async deleteBlog(id: string) {
    return this.request(`/blogs/${id}`, { method: 'DELETE' });
  }

  // Research & Publications endpoints
  async getResearch(params?: any) {
    return this.request('/research', { method: 'GET' });
  }

  async createResearch(data: any) {
    return this.request('/research', { method: 'POST', body: data });
  }

  async updateResearch(id: string, data: any) {
    return this.request(`/research/${id}`, { method: 'PUT', body: data });
  }

  async deleteResearch(id: string) {
    return this.request(`/research/${id}`, { method: 'DELETE' });
  }

  // Case Studies endpoints
  async getCaseStudies(params?: any) {
    return this.request('/case-studies', { method: 'GET' });
  }

  async createCaseStudy(data: any) {
    return this.request('/case-studies', { method: 'POST', body: data });
  }

  async updateCaseStudy(id: string, data: any) {
    return this.request(`/case-studies/${id}`, { method: 'PUT', body: data });
  }

  async deleteCaseStudy(id: string) {
    return this.request(`/case-studies/${id}`, { method: 'DELETE' });
  }

  // Events endpoints
  async getEvents(params?: any) {
    return this.request('/events', { method: 'GET' });
  }

  async createEvent(data: any) {
    return this.request('/events', { method: 'POST', body: data });
  }

  async updateEvent(id: string, data: any) {
    return this.request(`/events/${id}`, { method: 'PUT', body: data });
  }

  async deleteEvent(id: string) {
    return this.request(`/events/${id}`, { method: 'DELETE' });
  }

  // Customer Reviews endpoints
  async getReviews(params?: any) {
    return this.request('/reviews', { method: 'GET' });
  }

  async createReview(data: any) {
    return this.request('/reviews', { method: 'POST', body: data });
  }

  async updateReview(id: string, data: any) {
    return this.request(`/reviews/${id}`, { method: 'PUT', body: data });
  }

  async deleteReview(id: string) {
    return this.request(`/reviews/${id}`, { method: 'DELETE' });
  }

  // Demo Requests endpoints
  async getDemoRequests(params?: any) {
    return this.request('/demo-requests', { method: 'GET' });
  }

  async updateDemoRequest(id: string, data: any) {
    return this.request(`/demo-requests/${id}`, { method: 'PUT', body: data });
  }

  async deleteDemoRequest(id: string) {
    return this.request(`/demo-requests/${id}`, { method: 'DELETE' });
  }

  // Newsletter endpoints
  async getNewsletterSubscribers(params?: any) {
    return this.request('/newsletter', { method: 'GET' });
  }

  async deleteNewsletterSubscriber(id: string) {
    return this.request(`/newsletter/${id}`, { method: 'DELETE' });
  }

  // Pricing endpoints
  async getPricing(params?: any) {
    return this.request('/pricing', { method: 'GET' });
  }

  async createPricing(data: any) {
    return this.request('/pricing', { method: 'POST', body: data });
  }

  async updatePricing(id: string, data: any) {
    return this.request(`/pricing/${id}`, { method: 'PUT', body: data });
  }

  async deletePricing(id: string) {
    return this.request(`/pricing/${id}`, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
