export function Footer() {
  return (
    <footer className="py-16 text-center border-t border-[#eee] text-[var(--text-light)] relative z-10 bg-[var(--bg-color)]">
        <div className="container mx-auto px-8 max-w-[1200px]">
            <p className="mb-2">
              <a href="tel:+919793743769" className="hover:text-[var(--primary)] transition-colors">97937 43769</a> | contact.tbfst@gmail.com
            </p>
            <p>&copy; {new Date().getFullYear()} The Blissful Station. All rights reserved.</p>
        </div>
    </footer>
  )
}
