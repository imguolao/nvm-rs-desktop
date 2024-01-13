use std::path;
use serde::Serialize;
use dirs::{data_dir, home_dir};
use url::Url;
use crate::path_ext::PathExt;

#[derive(Serialize, Debug)]
pub struct NVMDeskTopConfig {
    /// https://nodejs.org/dist/ mirror
    pub node_dist_mirror: Url,

    /// The root directory of nvm-rs desktop installations.
    pub base_dir: Option<path::PathBuf>,
}

impl Default for NVMDeskTopConfig {
    fn default() -> Self {
        Self {
            node_dist_mirror: Url::parse("https://nodejs.org/dist/").unwrap(),
            base_dir: None,
        }
    }
}

impl NVMDeskTopConfig {
  pub fn base_dir_with_default(&self) -> path::PathBuf {
    let user_pref = self.base_dir.clone();
    if let Some(dir) = user_pref {
      return dir;
    }

    let dir_name = ".nvm_rs_desktop";
    let legacy = home_dir()
      .map(|dir| dir.join(dir_name))
      .filter(|dir| dir.exists());

    if let Some(dir) = legacy {
      return dir;
    }

    let modern = data_dir().map(|dir| dir.join(dir_name));
    modern
      .expect("Can't get data directory")
      .ensure_exists_silently()
  }

  pub fn installations_dir(&self) -> path::PathBuf {
    self
      .base_dir_with_default()
      .join("node_versions")
      .ensure_exists_silently()
  }
}
