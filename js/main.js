// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")

      // Animate hamburger menu
      const spans = mobileMenuBtn.querySelectorAll("span")
      spans.forEach((span, index) => {
        if (mobileMenu.classList.contains("active")) {
          if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) span.style.opacity = "0"
          if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          span.style.transform = "none"
          span.style.opacity = "1"
        }
      })
    })
  }
})

// Close mobile menu function
function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")

  if (mobileMenu && mobileMenuBtn) {
    mobileMenu.classList.remove("active")
    const spans = mobileMenuBtn.querySelectorAll("span")
    spans.forEach((span) => {
      span.style.transform = "none"
      span.style.opacity = "1"
    })
  }
}

// Parallax Background Effect with Interactive Hero
document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero")
  const parallaxBg = document.getElementById("parallaxBg")
  const heroSpotlight = document.getElementById("heroSpotlight")
  const heroGlow = document.getElementById("heroGlow")

  if (heroSection && parallaxBg) {
    const bgImage = parallaxBg.querySelector(".hero-bg-image")

    // Variables to control the effect intensity
    const movementFactor = 20
    const rotationFactor = 0.5
    const scaleFactor = 1.1

    const handleMouseMove = (e) => {
      try {
        const rect = heroSection.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Calculate relative position (-1 to 1)
        const relativeX = (x - centerX) / centerX
        const relativeY = (y - centerY) / centerY

        // Update CSS custom properties for mouse position
        heroSection.style.setProperty("--mouse-x", `${x}px`)
        heroSection.style.setProperty("--mouse-y", `${y}px`)

        // Update spotlight position
        if (heroSpotlight) {
          heroSpotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1) 0%, transparent 40%)`
        }

        // Update glow effect
        if (heroGlow) {
          heroGlow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 192, 0, 0.15) 0%, transparent 50%)`
        }

        // Apply parallax effect to background image
        if (bgImage) {
          bgImage.style.transform = `
            scale(${scaleFactor}) 
            translate(${-relativeX * movementFactor}px, ${-relativeY * movementFactor}px)
            rotateX(${relativeY * rotationFactor}deg) 
            rotateY(${-relativeX * rotationFactor}deg)
          `
        }

        // Apply parallax effect to floating elements
        const floatingElements = heroSection.querySelectorAll(".floating-element")
        floatingElements.forEach((element, index) => {
          const speed = (index + 1) * 0.02
          const moveX = relativeX * 20 * speed
          const moveY = relativeY * 20 * speed
          element.style.transform = `translate(${moveX}px, ${moveY}px)`
        })

        // Apply tilt effect to statistics cards
        const statCards = heroSection.querySelectorAll(".stat-card[data-tilt]")
        statCards.forEach((card) => {
          const cardRect = card.getBoundingClientRect()
          const cardCenterX = cardRect.left + cardRect.width / 2
          const cardCenterY = cardRect.top + cardRect.height / 2

          const deltaX = e.clientX - cardCenterX
          const deltaY = e.clientY - cardCenterY
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

          if (distance < 200) {
            const tiltX = (deltaY / 200) * 10
            const tiltY = (deltaX / 200) * -10
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`
          } else {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
          }
        })

        // Apply magnetic effect to buttons
        const buttons = heroSection.querySelectorAll(".magnetic-button")
        buttons.forEach((button) => {
          const buttonRect = button.getBoundingClientRect()
          const buttonCenterX = buttonRect.left + buttonRect.width / 2
          const buttonCenterY = buttonRect.top + buttonRect.height / 2

          const deltaX = e.clientX - buttonCenterX
          const deltaY = e.clientY - buttonCenterY
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

          if (distance < 100) {
            const pullX = (deltaX / distance) * 8
            const pullY = (deltaY / distance) * 8
            button.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.05)`
          } else {
            button.style.transform = "translate(0px, 0px) scale(1)"
          }
        })
      } catch (error) {
        console.warn("Error in mouse move handler:", error)
      }
    }

    const handleMouseLeave = () => {
      try {
        // Reset all effects when mouse leaves
        if (bgImage) {
          bgImage.style.transform = `scale(${scaleFactor}) translate(0px, 0px) rotateX(0deg) rotateY(0deg)`
        }

        if (heroSpotlight) {
          heroSpotlight.style.background = "transparent"
        }

        if (heroGlow) {
          heroGlow.style.background = "transparent"
        }

        const floatingElements = heroSection.querySelectorAll(".floating-element")
        floatingElements.forEach((element) => {
          element.style.transform = "translate(0px, 0px)"
        })

        const statCards = heroSection.querySelectorAll(".stat-card[data-tilt]")
        statCards.forEach((card) => {
          card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
        })

        const buttons = heroSection.querySelectorAll(".magnetic-button")
        buttons.forEach((button) => {
          button.style.transform = "translate(0px, 0px) scale(1)"
        })
      } catch (error) {
        console.warn("Error in mouse leave handler:", error)
      }
    }

    // Add event listeners with error handling
    try {
      heroSection.addEventListener("mousemove", handleMouseMove)
      heroSection.addEventListener("mouseleave", handleMouseLeave)

      // Set initial scale to prevent white edges
      if (bgImage) {
        bgImage.style.transform = `scale(${scaleFactor})`
        bgImage.style.transition = "transform 0.3s ease-out"
        bgImage.style.willChange = "transform"
      }
    } catch (error) {
      console.warn("Error setting up hero interactions:", error)
    }
  }
})

// Smooth Scrolling for Navigation Links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const header = document.querySelector(".header")
        const headerHeight = header ? header.offsetHeight : 80
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// Scroll to section function
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    const header = document.querySelector(".header")
    const headerHeight = header ? header.offsetHeight : 80
    const targetPosition = targetSection.offsetTop - headerHeight

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

// Copy PIX function
function copyPix() {
  const pixKey = "02500153000123"

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(pixKey)
      .then(() => {
        showNotification("Chave PIX copiada!")
      })
      .catch(() => {
        fallbackCopyTextToClipboard(pixKey)
      })
  } else {
    fallbackCopyTextToClipboard(pixKey)
  }
}

// Copy Bank Data function
function copyBankData() {
  const bankData = `Banco do Brasil
Agência: 3235-2
Conta Corrente: 1786-8
CNPJ: 02.500.153/0001-23`

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(bankData)
      .then(() => {
        showNotification("Dados bancários copiados!")
      })
      .catch(() => {
        fallbackCopyTextToClipboard(bankData)
      })
  } else {
    fallbackCopyTextToClipboard(bankData)
  }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea")
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.position = "fixed"
  textArea.style.opacity = "0"

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand("copy")
    if (successful) {
      showNotification("Dados copiados!")
    } else {
      showNotification("Erro ao copiar. Tente novamente.")
    }
  } catch (err) {
    console.warn("Copy failed:", err)
    showNotification("Erro ao copiar. Tente novamente.")
  }

  document.body.removeChild(textArea)
}

// Show notification function
function showNotification(message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Newsletter subscription function
function subscribeNewsletter() {
  const emailInput = document.getElementById("newsletterEmail")
  if (!emailInput) return

  const email = emailInput.value.trim()

  if (email && isValidEmail(email)) {
    showNotification("Obrigado por se inscrever em nossa newsletter!")
    emailInput.value = ""
  } else {
    showNotification("Por favor, insira um e-mail válido.")
  }
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Intersection Observer for animations
document.addEventListener("DOMContentLoaded", () => {
  // Check if IntersectionObserver is supported
  if (!window.IntersectionObserver) {
    console.warn("IntersectionObserver not supported")
    return
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        entry.target.style.animation = "fadeInUp 0.6s ease forwards"
        observer.unobserve(entry.target) // Stop observing once animated
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".stats-card, .activity-card, .testimonial-card, .participate-card, .donation-card",
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Header scroll effect
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header")
  if (!header) return

  let lastScrollTop = 0
  let ticking = false

  const updateHeader = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "#ffffff"
      header.style.backdropFilter = "none"
    }

    lastScrollTop = scrollTop
    ticking = false
  }

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true })
})

// Add loading state to buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button")

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.classList.contains("btn-yellow") || this.classList.contains("btn-primary")) {
        const originalText = this.textContent
        this.textContent = "Processando..."
        this.disabled = true

        setTimeout(() => {
          this.textContent = originalText
          this.disabled = false
        }, 1000)
      }
    })
  })
})

// Handle image loading errors
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.warn("Failed to load image:", this.src)
      // You could set a fallback image here if needed
      // this.src = "/path/to/fallback-image.jpg"
    })
  })
})

// Ensure fonts are loaded
document.addEventListener("DOMContentLoaded", () => {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(() => {
        console.log("Fonts loaded successfully")
      })
      .catch((error) => {
        console.warn("Font loading error:", error)
      })
  }
})

// Initialize all interactive features
document.addEventListener("DOMContentLoaded", () => {
  console.log("ADEVIRP Landing Page loaded successfully!")

  // Add a small delay to ensure all elements are rendered
  setTimeout(() => {
    // Force a repaint to ensure proper layout
    document.body.style.display = "none"
    document.body.offsetHeight // Trigger reflow
    document.body.style.display = ""
  }, 100)
})

// Handle resize events
let resizeTimeout
window.addEventListener(
  "resize",
  () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      // Force layout recalculation on resize
      const event = new Event("resize")
      window.dispatchEvent(event)
    }, 250)
  },
  { passive: true },
)
