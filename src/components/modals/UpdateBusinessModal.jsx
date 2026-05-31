import { useEffect, useRef, useState } from "react";
import { X, MapPin, Map, CheckCircle, Loader2 } from "lucide-react";

export default function UpdateBusinessModal({ isOpen, onClose, client }) {
  const [shopName, setShopName] = useState(client?.shopName ?? "");
  const [ownerName, setOwnerName] = useState(client?.ownerName ?? "");
  const [phone, setPhone] = useState(client?.phone ?? "");
  const [email, setEmail] = useState(client?.email ?? "");
  const [location, setLocation] = useState(client?.location ?? "");
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const backdropRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (status !== "loading") onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, status]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current && status !== "loading") {
      onClose();
    }
  };

  const handleSave = () => {
    if (status === "loading") return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onClose();
      }, 1000);
    }, 1500);
  };

  if (!isOpen) return null;

  const inputBase =
    "w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[70] flex items-center justify-center"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(244, 245, 248, 0.6)",
      }}
    >
      <div className="bg-surface-container-lowest w-full max-w-[560px] rounded-xl shadow-2xl border border-outline-variant overflow-hidden animate-in fade-in zoom-in duration-200 mx-4">
        {/* Header */}
        <div className="px-8 py-6 flex justify-between items-center border-b border-outline-variant">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Update Business Details
            </h2>
            <p className="text-caption text-on-surface-variant mt-0.5">
              Edit primary information for {client?.shopName || "this business"}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={status === "loading"}
            className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Shop Name */}
          <div className="space-y-2">
            <label
              htmlFor="shop-name"
              className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block"
            >
              Shop Name
            </label>
            <input
              id="shop-name"
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className={inputBase}
            />
          </div>

          {/* Owner Name */}
          <div className="space-y-2">
            <label
              htmlFor="owner-name"
              className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block"
            >
              Owner Name
            </label>
            <input
              id="owner-name"
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className={inputBase}
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block"
              >
                Primary Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputBase}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block"
              >
                Support Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputBase}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block"
            >
              Location / City
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`${inputBase} pl-10`}
              />
            </div>
          </div>

          {/* Map Preview */}
          <div className="h-[120px] w-full rounded-lg bg-surface-container overflow-hidden relative group border border-outline-variant">
            {client?.mapImage ? (
              <img
                src={client.mapImage}
                alt="Map Preview"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full bg-surface-container" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent flex items-end p-3">
              <span className="text-caption font-body-strong flex items-center gap-1">
                <Map className="w-3.5 h-3.5" />
                Verify Business Geolocation
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-surface-container-low flex justify-end items-center gap-4">
          <button
            onClick={onClose}
            disabled={status === "loading"}
            className="px-6 py-2.5 rounded-lg font-body-strong text-body-strong text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={status !== "idle"}
            className="px-8 py-2.5 rounded-lg font-body-strong text-body-strong shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70"
            style={{
              backgroundColor: status === "success" ? "#16A34A" : undefined,
            }}
          >
            {status === "idle" && "Save Changes"}
            {status === "loading" && (
              <>
                <Loader2 className="w-[18px] h-[18px] animate-spin" />
                Updating...
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle className="w-[18px] h-[18px]" />
                Saved
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
