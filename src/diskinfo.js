const { exec, execSync } = require('child_process');
const promisify = require('util.promisify');
const execAsync = promisify(exec);
const os = require('os');

async function getDiskInfoWin() {
  /**
   * Fields wmic logicaldisk get:
   * Access Availability BlockSize Caption Compressed ConfigManagerErrorCode ConfigManagerUserConfig CreationClassName
   * Description DeviceID DriveType ErrorCleared ErrorDescription ErrorMethodology FileSystem  FreeSpace InstallDate
   * LastErrorCode MaximumComponentLength MediaType Name NumberOfBlocks PNPDeviceID PowerManagementCapabilities
   * PowerManagementSupported  ProviderName Purpose  QuotasDisabled QuotasIncomplete QuotasRebuilding Size
   * Status StatusInfo SupportsDiskQuotas SupportsFileBasedCompression SystemCreationClassName SystemName
   * VolumeDirty VolumeName VolumeSerialNumber
   *
   * https://msdn.microsoft.com/en-us/library/aa394173(v=vs.85).aspx
   */

  const command = "wmic logicaldisk get name,caption,volumename,size,filesystem,freespace,MediaType";

  const info = await execAsync(command);

  // TODO: parse info
}

async function getDiskInfoPosix() {
  const command = 'df';

  const info = await execAsync(command);

  // TODO: parse info
}

async function getDiskInfo() {
  if( os.platform() === 'win32' ) {
    return await getDiskInfoWin();
  }

  return await getDiskInfoPosix();
}

module.exports = getDiskInfo;
