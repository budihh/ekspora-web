export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h1 className="text-display font-display font-bold text-text-primary tracking-tight mb-6">
              Let's Talk Business
            </h1>
            <p className="text-body text-text-secondary mb-12">
              Interested in our commodities? Have a specific requirement? Fill out the form, and our export specialists will get back to you with a tailored quotation within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-surface rounded-lg border border-border-hairline text-text-muted">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="text-small font-medium text-text-primary mb-1">Email</h4>
                  <p className="text-small text-text-secondary">sales@ekspora.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-surface rounded-lg border border-border-hairline text-text-muted">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="text-small font-medium text-text-primary mb-1">Phone / WhatsApp</h4>
                  <p className="text-small text-text-secondary">+62 811 2345 6789</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-surface rounded-lg border border-border-hairline text-text-muted">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-small font-medium text-text-primary mb-1">Office</h4>
                  <p className="text-small text-text-secondary">Sudirman Central Business District (SCBD)<br/>Jakarta, Indonesia 12190</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border-hairline rounded-2xl p-8 shadow-xl">
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Full Name</label>
                  <input type="text" className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:outline-none focus:border-accent" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Company</label>
                  <input type="text" className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:outline-none focus:border-accent" placeholder="Acme Corp" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Email Address</label>
                <input type="email" className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:outline-none focus:border-accent" placeholder="john@example.com" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Commodity of Interest</label>
                <select className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:outline-none focus:border-accent appearance-none">
                  <option>Select a commodity...</option>
                  <option>Spices & Herbs</option>
                  <option>Coffee Beans</option>
                  <option>Coconut Products</option>
                  <option>Cocoa</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Message / Requirement Details</label>
                <textarea rows={4} className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:outline-none focus:border-accent resize-none" placeholder="Please specify quantity, destination port, etc."></textarea>
              </div>

              <button type="button" className="mt-4 bg-text-primary text-base hover:opacity-90 font-bold py-3.5 rounded-lg transition-opacity">
                Send Inquiry
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
