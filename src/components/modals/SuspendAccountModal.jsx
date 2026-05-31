import { useState, useEffect, useRef } from 'react'
import { AlertTriangle, X, Ban, Loader2 } from 'lucide-react'

export default function SuspendAccountModal({ isOpen, onClose, clientName }) {
  const [reason, setReason] = useState('')
  const [notifyClient, setNotifyClient] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [shakeReason, setShakeReason] = useState(false)
  const prevIsOpen = useRef(isOpen)

  // Reset state whenever the modal opens
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setReason('')
      setNotifyClient(false)
      setIsProcessing(false)
      setIsSuccess(false)
      setShakeReason(false)
    }
    prevIsOpen.current = isOpen
  }, [isOpen])

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (!isProcessing) onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isProcessing, onClose])

  const handleConfirm = () => {
    if (reason.trim() === '') {
      setShakeReason(true)
      setTimeout(() => setShakeReason(false), 400)
      return
    }

    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(15, 28, 58, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-[520px] overflow-hidden border border-outline-variant transform scale-100 transition-all">
        {/* Danger Header */}
        <div className="bg-error-container/30 px-6 py-5 flex items-start gap-4 border-b border-error-container/50">
          <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Suspend Account
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              You are about to suspend{' '}
              <span className="font-body-strong text-on-surface">
&apos;{clientName}&apos;
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="ml-auto p-1 text-outline hover:text-on-surface transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="bg-status-active-bg border-l-4 border-status-active p-4">
              <p className="font-body-md text-body-md text-on-surface">
                <strong>Success:</strong> Account &quot;{clientName}&quot; has been
                successfully suspended.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-error-container/10 border-l-4 border-error p-4 mb-6">
                <p className="font-body-md text-body-md text-on-error-container">
                  <strong>Immediate Action Required:</strong> Suspending this
                  account will immediately halt all outgoing messages, revoke API
                  access keys, and disable client portal login. This action is
                  logged for compliance.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="reason"
                    className="block font-label-md text-label-md text-on-surface-variant mb-1.5"
                  >
                    Reason for suspension
                  </label>
                  <textarea
                    id="reason"
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Explain why this account is being suspended (e.g., TOS violation, non-payment, suspicious activity)..."
                    className={[
                      'w-full bg-surface-container-lowest border rounded-lg p-3 text-body-md font-body-md outline-none transition-all placeholder:text-outline',
                      'focus:ring-2 focus:ring-error focus:border-error',
                      shakeReason
                        ? 'border-error animate-shake'
                        : 'border-outline-variant',
                    ].join(' ')}
                  />
                </div>

                <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                  <input
                    id="notify"
                    type="checkbox"
                    checked={notifyClient}
                    onChange={(e) => setNotifyClient(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-error focus:ring-error"
                  />
                  <label
                    htmlFor="notify"
                    className="font-body-md text-body-md text-on-surface"
                  >
                    Notify client via primary email address
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 bg-surface-container-low flex justify-end gap-3">
          {isSuccess ? (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg font-body-strong text-body-strong bg-primary text-on-primary hover:bg-primary/90 transition-colors"
            >
              Done
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-lg font-body-strong text-body-strong text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-error text-on-error rounded-lg font-body-strong text-body-strong hover:bg-red-700 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-[18px] h-[18px] animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Ban className="w-[18px] h-[18px]" />
                    Suspend Account
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
