/**
 * Confirmation modal for costly or destructive actions (SMS broadcast to
 * millions, dispute resolution, …). Nothing money- or message-shaped fires
 * on a single click.
 */
export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  body: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-[20px]" style={{ background: 'rgba(0,0,0,0.7)' }} role="dialog" aria-modal="true" aria-label={title}>
      <div className="bg-surface border border-line rounded-[12px] p-[28px] max-w-[400px] w-full">
        <h2 className="text-[18px] font-normal tracking-[-0.01em] m-0 mb-[10px] text-ink">{title}</h2>
        <p className="text-[14px] text-ink2 leading-[1.6] m-0 mb-[22px]">{body}</p>
        <div className="flex gap-[10px] justify-end">
          <button
            onClick={onCancel}
            className="bg-transparent text-ink2 border border-line rounded-[8px] px-[18px] py-[11px] text-[13.5px] cursor-pointer font-[inherit] min-h-[44px] hover:text-ink hover:border-ink3"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary text-primary-ink border-none rounded-[8px] px-[18px] py-[11px] text-[13.5px] cursor-pointer font-[inherit] min-h-[44px] hover:opacity-[0.88]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
