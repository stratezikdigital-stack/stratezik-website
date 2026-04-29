/** Scroll to #contact on the home page, or navigate there from other routes. */
export function scrollToContactSection() {
  const path = window.location.pathname
  if (path !== '/' && path !== '') {
    window.location.assign('/#contact')
    return
  }
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

/** Focus the lead form after scrolling (same-origin home only). */
export function scrollToContactForm() {
  const path = window.location.pathname
  if (path !== '/' && path !== '') {
    window.location.assign('/#contact-form')
    return
  }
  const el = document.getElementById('contact-form')
  el?.scrollIntoView({ behavior: 'smooth' })
  window.setTimeout(() => document.getElementById('name')?.focus(), 450)
}
