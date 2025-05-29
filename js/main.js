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

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll("a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        const spans = mobileMenuBtn.querySelectorAll("span")
        spans.forEach((span) => {
          span.style.transform = "none"
          span.style.opacity = "1"
        })
      })
    })
  }
})

// Parallax Background Effect
document.addEventListener("DOMContentLoaded", () => {
  const parallaxBg = document.getElementById("parallaxBg")
  const heroSection = document.querySelector(".hero")

  if (parallaxBg && heroSection) {
    const bgImage = parallaxBg.querySelector(".hero-bg-image")

    // Variables to control the effect intensity
    const movementFactor = 20 // How much the image moves (lower = more subtle)
    const rotationFactor = 0.5 // How much the image rotates (lower = more subtle)
    const scaleFactor = 1.1 // Initial scale to ensure no white edges during movement

    const handleMouseMove = (e) => {
      const rect = heroSection.getBoundingClientRect()

      // Calculate mouse position relative to the center of the container
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Calculate the percentage of mouse position (-1 to 1)
      const relativeX = (mouseX - centerX) / centerX
      const relativeY = (mouseY - centerY) / centerY

      // Apply transform to the image with smooth transition
      // Move in the opposite direction of mouse for parallax effect
      if (bgImage) {
        bgImage.style.transform = `
                    scale(${scaleFactor}) 
                    translate(${-relativeX * movementFactor}px, ${-relativeY * movementFactor}px)
                    rotateX(${relativeY * rotationFactor}deg) 
                    rotateY(${-relativeX * rotationFactor}deg)
                `
      }
    }

    const handleMouseLeave = () => {
      // Reset the image position with a smooth transition when mouse leaves
      if (bgImage) {
        bgImage.style.transform = `scale(${scaleFactor}) translate(0px, 0px) rotateX(0deg) rotateY(0deg)`
      }
    }

    // Add event listeners
    heroSection.addEventListener("mousemove", handleMouseMove)
    heroSection.addEventListener("mouseleave", handleMouseLeave)

    // Set initial scale to prevent white edges
    if (bgImage) {
      bgImage.style.transform = `scale(${scaleFactor})`
      bgImage.style.transition = "transform 0.3s ease-out"
      bgImage.style.willChange = "transform"
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
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

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
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #0693e3;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Intersection Observer for animations
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
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
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    } else {
      header.style.background = "#ffffff"
      header.style.backdropFilter = "none"
    }

    lastScrollTop = scrollTop
  })
})

// Newsletter form handling
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.querySelector(".newsletter-form")
  const newsletterInput = document.querySelector(".newsletter-input")
  const newsletterBtn = document.querySelector(".newsletter-btn")

  if (newsletterBtn) {
    newsletterBtn.addEventListener("click", (e) => {
      e.preventDefault()

      const email = newsletterInput.value.trim()

      if (email && isValidEmail(email)) {
        showNotification("Obrigado por se inscrever em nossa newsletter!")
        newsletterInput.value = ""
      } else {
        showNotification("Por favor, insira um e-mail válido.")
      }
    })
  }
})

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

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
