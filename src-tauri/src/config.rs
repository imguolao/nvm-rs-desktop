use anyhow::{anyhow, Result};
use std::io::Read;
use std::path::{Path, PathBuf};
use std::fs::File;
use serde::{Serialize, Deserialize};
use dirs::home_dir;
use url::Url;

#[derive(Serialize, Deserialize, Debug)]
pub struct DesktopConfig {
    /// https://nodejs.org/dist/ mirror
    pub node_dist_mirror: Url,

    /// The root directory of nvm-rs desktop installations.
    pub base_dir: PathBuf,
}

impl DesktopConfig {
    pub fn new() -> Result<Self> {
        let config_file_path_buf = get_config_file_path()?;
        let config_file_path = config_file_path_buf.as_path();

        if let Some(config) = read_config_from_file(&config_file_path)? {
            return Ok(config);
        }

        let base_dir = home_dir()
            .ok_or(anyhow!("Can't get the user home directory address."))?
            .join(".nvm_rs_desktop");

        Ok(DesktopConfig {
            node_dist_mirror: Url::parse("https://nodejs.org/dist/")?,
            base_dir,
        })
    }
}

/// Read the configuration from the local file.
fn read_config_from_file(file_path: &Path) -> Result<Option<DesktopConfig>> {
    if file_path.exists() {
        let mut file = File::open(file_path)?;
        let mut contents = String::new();

        let _ = file.read_to_string(&mut contents);

        let config: DesktopConfig = serde_json::from_str(&contents)?;

        return Ok(Some(config));
    }

    Ok(None)
}

/// Get the config file path.
fn get_config_file_path() -> Result<PathBuf> {
    let file_path_pref = match home_dir() {
        Some(dir) => dir,
        None => {
            return Err(anyhow!("Can't get the user home directory address."));
        },
    };

    Ok(file_path_pref.join(".nvm_rs_desktop.config"))
}
