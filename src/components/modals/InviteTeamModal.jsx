import { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  ChevronDown,
  ShieldCheck,
  HelpCircle,
  Headset,
  Scale,
  Send,
} from "lucide-react";

const roleDescriptions = {
  "super-admin": {
    title: "Super Admin Permissions",
    Icon: ShieldCheck,
    text: "Full access to all platform settings, user management, financial records, and system-wide configurations.",
  },
  "support-1": {
    title: "Support Tier 1 Permissions",
    Icon: HelpCircle,
    text: "View basic user data, transaction history, and answer support tickets. No refund or user-deletion capability.",
  },
  "support-2": {
    title: "Support Tier 2 Permissions",
    Icon: Headset,
    text: "Manage user profiles, process standard refunds, and escalate technical issues to engineering.",
  },
  compliance: {
    title: "Compliance Permissions",
    Icon: Scale,
    text: "Full access to audit logs, KYC documentation, and legal reporting tools. Cannot change system settings.",
  },
};

const departments = [
  "Operations",
  "Support",
  "Risk & Compliance",
  "Engineering",
];

export default function InviteTeamModal({ isOpen, onClose }) {
  const [role, setRole] = useState("super-admin");
  const [dept, setDept] = useState("Operations");
  const [note, setNote] = useState("");
  const [descVisible, setDescVisible] = useState(true);
  const descTimeoutRef = useRef(null);

  const currentRole = roleDescriptions[role];
  const RoleIcon = currentRole.Icon;

  const handleRoleChange = useCallback((e) => {
    const newRole = e.target.value;
    setDescVisible(false);
    if (descTimeoutRef.current) clearTimeout(descTimeoutRef.current);
    descTimeoutRef.current = setTimeout(() => {
      setRole(newRole);
      setDescVisible(true);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (descTimeoutRef.current) clearTimeout(descTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-inverse-surface/30 backdrop-blur-md transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface-container-lowest w-full max-w-[560px] rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Invite Team Member
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md mt-1">
              Grant administrative access to your organization.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <form className="px-8 py-6 space-y-6 max-h-[716px] overflow-y-auto custom-scrollbar">
          {/* Full Name + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-body-strong text-body-strong text-on-surface">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Carter"
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-body-strong text-body-strong text-on-surface">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@wance.admin"
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="block font-body-strong text-body-strong text-on-surface">
              Role
            </label>
            <div className="relative group">
              <select
                value={role}
                onChange={handleRoleChange}
                className="w-full appearance-none px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md pr-10"
              >
                <option value="super-admin">Super Admin</option>
                <option value="support-1">Support Tier 1</option>
                <option value="support-2">Support Tier 2</option>
                <option value="compliance">Compliance</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant w-5 h-5" />
            </div>

            {/* Dynamic permission card */}
            <div
              className={`mt-3 grid grid-cols-1 gap-3 p-4 bg-surface-container-low rounded-lg border border-outline-variant/30 transition-opacity duration-150 ${
                descVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-start gap-3">
                <RoleIcon className="text-primary w-5 h-5 mt-0.5" />
                <div>
                  <p className="font-body-strong text-body-strong text-on-surface">
                    {currentRole.title}
                  </p>
                  <p className="text-caption text-on-surface-variant">
                    {currentRole.text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label className="block font-body-strong text-body-strong text-on-surface">
              Department
            </label>
            <div className="flex flex-wrap gap-2">
              {departments.map((d) => (
                <label key={d} className="cursor-pointer">
                  <input
                    type="radio"
                    name="dept"
                    value={d}
                    checked={dept === d}
                    onChange={() => setDept(d)}
                    className="hidden peer"
                  />
                  <div className="px-4 py-2 rounded-full border border-outline-variant font-body-md text-on-surface peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary transition-all">
                    {d}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Personal Note */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block font-body-strong text-body-strong text-on-surface">
                Personal Note{" "}
                <span className="font-normal text-on-surface-variant">
                  (Optional)
                </span>
              </label>
              <span className="text-caption text-on-surface-variant">
                {note.length}/240
              </span>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 240))}
              rows={3}
              placeholder="Welcome to the team! Here's access to our admin console..."
              className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md resize-none"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-6 bg-surface-container border-t border-outline-variant flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg font-body-strong text-body-strong text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-container text-white px-8 py-2.5 rounded-lg font-body-strong text-body-strong shadow-lg shadow-primary-container/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Send className="w-[18px] h-[18px]" />
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
}
