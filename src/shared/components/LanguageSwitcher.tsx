import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Language">
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <TranslateRoundedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          selected={i18n.language.startsWith("en")}
          onClick={() => {
            i18n.changeLanguage("en");
            setAnchorEl(null);
          }}
        >
          English
        </MenuItem>

        <MenuItem
          selected={i18n.language.startsWith("ar")}
          onClick={() => {
            i18n.changeLanguage("ar");
            setAnchorEl(null);
          }}
        >
          العربية
        </MenuItem>
      </Menu>
    </>
  );
}
