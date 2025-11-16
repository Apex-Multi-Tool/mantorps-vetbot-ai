class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background-color: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(8px);
                }
                
                .nav-link {
                    transition: all 0.2s ease;
                }
                
                .nav-link:hover {
                    color: #8b5cf6;
                }
            </style>
            <header class="border-b border-gray-800">
                <nav class="container mx-auto px-6 py-4">
                    <div class="flex justify-between items-center">
                        <a href="/" class="flex items-center space-x-2">
                            <div class="bg-primary-500 p-2 rounded-lg">
                                <i data-feather="message-circle" class="w-5 h-5"></i>
                            </div>
                            <span class="text-xl font-bold">Mantorps VetBot</span>
</a>
                        
                        <div class="hidden md:flex items-center space-x-8">
                            <a href="#" class="nav-link text-gray-300 hover:text-white">
