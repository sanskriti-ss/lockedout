# EEG Integration Guide

## 🎧 **Connecting Your Real EEG Headset**

Now that you have a real EEG device, here's how to integrate it with LockedOut:

### 📋 **Step 1: Identify Your EEG Device**

The system supports several common EEG headsets:

- **Muse Headset** (Muse 2, Muse S)
- **NeuroSky MindWave**
- **OpenBCI** (Cyton, Ganglion)
- **Custom Device** (Any other EEG headset)

### 🔧 **Step 2: Update EEG Data Structure**

First, update the `EEGData` interface in `src/hooks/use-adaptive-session.ts` to match your device's output:

```typescript
export interface EEGData {
    // Replace with your actual EEG metrics
    alpha?: number;
    beta?: number;
    theta?: number;
    delta?: number;
    gamma?: number;
    
    // Add your specific metrics here:
    attention?: number;      // NeuroSky
    meditation?: number;     // NeuroSky
    concentration?: number;  // Muse
    calm?: number;          // Muse
    
    // For raw channel data:
    channel1?: number;
    channel2?: number;
    channel3?: number;
    channel4?: number;
    
    [key: string]: number | undefined;
}
```

### 🧠 **Step 3: Update EEG Processing Algorithm**

Replace the `processEEGData` function in `src/hooks/use-adaptive-session.ts` with your actual algorithm:

```typescript
export const processEEGData = (eegData: EEGData): MoodScores => {
    // Replace this with your actual EEG processing logic
    
    // Example for NeuroSky:
    const stress = 100 - (eegData.meditation || 0);
    const engagement = eegData.attention || 0;
    const focus = eegData.attention || 0;
    const relaxation = eegData.meditation || 0;
    
    // Example for Muse:
    // const stress = 100 - (eegData.calm || 0);
    // const engagement = eegData.concentration || 0;
    
    // Example for raw channel data:
    // const alpha = eegData.channel1 || 0;
    // const beta = eegData.channel2 || 0;
    // const stress = Math.min(100, (beta / (alpha + 0.1)) * 50);
    
    return {
        stress: Math.round(stress),
        engagement: Math.round(engagement),
        interest: Math.round(50), // Calculate based on your metrics
        excitement: Math.round(50), // Calculate based on your metrics
        focus: Math.round(focus),
        relaxation: Math.round(relaxation)
    };
};
```

### 🔌 **Step 4: Update Device Connection**

Modify the `initializeCustom()` function in `src/lib/eeg-integration.ts` for your specific device:

#### For Bluetooth EEG Devices:
```typescript
private async initializeCustom(): Promise<boolean> {
    try {
        // Replace with your device's Bluetooth service UUID
        const device = await navigator.bluetooth.requestDevice({
            filters: [
                { namePrefix: 'YourDeviceName' }, // Replace with your device name
                { services: ['your-service-uuid'] } // Replace with your service UUID
            ]
        });

        const server = await device.gatt?.connect();
        const service = await server.getPrimaryService('your-service-uuid');
        const characteristic = await service.getCharacteristic('your-characteristic-uuid');
        
        await characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged', (event) => {
            this.handleEEGData(event);
        });

        return true;
    } catch (error) {
        console.error('EEG connection failed:', error);
        return false;
    }
}
```

#### For USB/Serial EEG Devices:
```typescript
private async initializeCustom(): Promise<boolean> {
    try {
        // Use Web Serial API for USB devices
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 }); // Replace with your device's baud rate
        
        const reader = port.readable.getReader();
        
        // Read data continuously
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            // Parse your device's data format
            const eegData = this.parseYourDeviceData(value);
            if (this.onDataCallback) {
                this.onDataCallback(eegData);
            }
        }
        
        return true;
    } catch (error) {
        console.error('EEG connection failed:', error);
        return false;
    }
}
```

### 📊 **Step 5: Update Data Parsing**

Replace the `parseRawEEGData` function with your device's data format:

```typescript
private parseRawEEGData(rawData: any): EEGData {
    // Replace with your device's data parsing logic
    
    // Example for NeuroSky:
    // const data = new Uint8Array(rawData.buffer);
    // return {
    //     attention: data[1],
    //     meditation: data[2]
    // };
    
    // Example for Muse:
    // const data = new Float32Array(rawData.buffer);
    // return {
    //     alpha: data[0],
    //     beta: data[1],
    //     theta: data[2],
    //     delta: data[3],
    //     gamma: data[4]
    // };
    
    // Example for custom format:
    const buffer = rawData.buffer;
    const view = new DataView(buffer);
    
    return {
        alpha: view.getFloat32(0, true),
        beta: view.getFloat32(4, true),
        theta: view.getFloat32(8, true),
        delta: view.getFloat32(12, true),
        gamma: view.getFloat32(16, true)
    };
}
```

### 🎯 **Step 6: Test Your Integration**

1. **Start the development server**: `npm run dev`
2. **Go to Intense Study mode**: http://localhost:8080/intense-study
3. **Select your device type** from the dropdown
4. **Click "Connect EEG Device"**
5. **Start a session** and watch the real-time mood visualization

### 🔍 **Step 7: Debug and Calibrate**

Check the browser console for:
- EEG data updates: `🧠 EEG data updated: {...}`
- Processed mood scores: `🧠 Processed mood scores: {...}`
- System actions: `💡 Brightness set to X%`, etc.

### 📝 **Common EEG Headset Examples**

#### NeuroSky MindWave:
```typescript
// Data format: [0xAA, 0xAA, 0x04, 0x80, 0x02, attention, meditation, checksum]
const parseNeuroSky = (data: Uint8Array): EEGData => ({
    attention: data[5],
    meditation: data[6]
});
```

#### Muse 2:
```typescript
// Data format: 4 channels of 12-bit data
const parseMuse = (data: Float32Array): EEGData => ({
    alpha: data[0],
    beta: data[1], 
    theta: data[2],
    delta: data[3],
    gamma: data[4]
});
```

#### OpenBCI:
```typescript
// Data format: 8 channels of 24-bit data
const parseOpenBCI = (data: Float32Array): EEGData => ({
    channel1: data[0], // Fp1
    channel2: data[1], // Fp2
    channel3: data[2], // C3
    channel4: data[3], // C4
    // ... more channels
});
```

### 🚀 **Step 8: Deploy**

Once your integration is working:
1. **Test thoroughly** with your specific device
2. **Calibrate thresholds** if needed
3. **Deploy to production**
4. **Monitor performance** and adjust as needed

### 🆘 **Troubleshooting**

**Device not connecting:**
- Check Bluetooth permissions
- Verify device is in pairing mode
- Check service/characteristic UUIDs

**Data not updating:**
- Check data parsing function
- Verify callback is being called
- Check console for errors

**Mood scores seem wrong:**
- Adjust processing algorithm
- Calibrate with known states
- Check data normalization

### 📞 **Need Help?**

If you need help with your specific EEG device:
1. Check your device's documentation
2. Look for existing JavaScript/Web APIs
3. Contact the device manufacturer
4. Check the browser console for detailed logs

---

**Your EEG headset is now ready to power the adaptive environment!** 🧠✨ 