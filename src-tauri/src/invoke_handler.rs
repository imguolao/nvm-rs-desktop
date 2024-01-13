use crate::config::NVMDeskTopConfig;

#[tauri::command]
pub fn get_desktop_config() -> NVMDeskTopConfig {
    NVMDeskTopConfig::default()
}
