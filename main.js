/**
 * Initialize.
 */
function init () {
  const buttons = [
    { type: 'enable', callback: enable },
    { type: 'disable', callback: disable },
  ]

  // Add event listeners.
  buttons.forEach(button => {
    const element = document.querySelector(`[data-camera="${button.type}"]`)
    element.addEventListener('click', button.callback)
  })
}

/**
 * Enable camera.
 */
async function enable () {
  try {
    // Get the stream.
    const stream = navigator.mediaDevices
      .getUserMedia({ video: { width: 400, height: 300 } })

    // Pass camera stream to the video element.
    await passStreamToVideo(stream)

    // Update DOM state.
    setTimeout(
      () => {
        document.getElementById('video').parentElement.classList.remove('loading')
      },
      1000 * 1.75, // The camera stream may take a couple seconds to load.
    )
    document.querySelector('[data-camera="enable"]').setAttribute('disabled', true)
    document.querySelector('[data-camera="disable"]').removeAttribute('disabled')

    // Log to the console.
    console.info('Enable camera.')
  } catch (error) {
    console.error(error)
  }
}

/**
 * Pass camera stream to the video element.
 * @param {Object} stream Camera stream.
 */
async function passStreamToVideo (stream) {
  // If there is no video, bail.
  const video = document.getElementById('video')
  if (!video) return

  // Update the DOM state.
  video.parentElement.classList.add('loading')

  // Pass the camera stream to the video element.
  video.srcObject = await stream

  // Play the stream video instead of just capturing a still image.
  video.play()
}

/**
 * Disable camera.
 */
function disable () {
  // Update DOM state.
  document.querySelector('[data-camera="disable"]').setAttribute('disabled', true)
  document.querySelector('[data-camera="enable"]').removeAttribute('disabled')

  // If there is no video, or the video is off, bail.
  const video = document.getElementById('video')
  if (!video || !video.srcObject) return

  // Stop passing the camera stream to the video element.
  (video.srcObject.getTracks()).forEach(track => track.stop())
  video.srcObject = null

  // Log to the console.
  console.info('Disable camera.')

  /**
   * As long as no other DOM elements are also streaming from the camera, the
   * camera should now be off. If it's still on, something else is using it.
   */
}

// Initialize.
init()
