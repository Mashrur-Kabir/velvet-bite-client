import { deleteMealAction, updateMealAction } from "@/actions/provider.action";
import { IMeal } from "@/types";
import { toast } from "sonner";

const fontStyle = {
  fontFamily: "var(--font-serif)",
  letterSpacing: "-0.02em",
};

const toastBaseStyle = {
  background: "oklch(0.45 0.08 55)", // Shiny light chocolate
  color: "oklch(0.92 0.03 65)", // Cream text
  border: "1px solid oklch(0.35 0.03 45)",
  padding: "16px",
  ...fontStyle,
};

// --- DELETE HANDLERS ---
export const executeDelete = async (id: string) => {
  const res = await deleteMealAction(id);
  if (res.error) {
    toast.error(res.error.message, { style: toastBaseStyle });
  } else {
    toast.success("Recipe Erased Successfully", { style: toastBaseStyle });
  }
};

export const handleDeleteTrigger = (id: string) => {
  toast("Erase Recipe?", {
    description: "This will permanently remove the dish from your archives.",
    action: {
      label: "Confirm",
      onClick: () => executeDelete(id),
    },
    cancel: {
      label: "Cancel",
      onClick: () => toast.dismiss(),
    },
    style: toastBaseStyle,
    actionButtonStyle: {
      background: "oklch(67.764% 0.11456 67.729)", // Caramel bg
      color: "oklch(0.2 0.05 45)",
      fontWeight: "700",
      textTransform: "uppercase",
      fontSize: "10px",
      letterSpacing: "0.1em",
      borderRadius: "8px",
      fontFamily: "var(--font-sans)",
    },
    cancelButtonStyle: {
      background: "oklch(0.35 0.06 50)", // Deeper chocolate
      color: "oklch(0.92 0.03 65)",
      textTransform: "uppercase",
      fontSize: "10px",
      letterSpacing: "0.1em",
      borderRadius: "8px",
      fontFamily: "var(--font-sans)",
    },
  });
};

// --- AVAILABILITY HANDLER ---
export const toggleAvailability = async (meal: IMeal) => {
  const res = await updateMealAction(meal.id, {
    isAvailable: !meal.isAvailable,
  });

  if (res.error) {
    toast.error(res.error.message, {
      style: { ...toastBaseStyle, border: "1px solid rgba(224, 62, 62, 0.3)" },
    });
  } else {
    const isLive = res.data?.isAvailable;
    toast.success(isLive ? "Dish is now Live" : "Dish Hidden", {
      style: {
        ...toastBaseStyle,
        border: "1px solid oklch(67.764% 0.11456 67.729 / 0.2)",
      },
    });
  }
};
