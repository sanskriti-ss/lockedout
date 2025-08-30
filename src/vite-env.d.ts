/// <reference types="vite/client" />

// Web Bluetooth API types
interface BluetoothDevice {
    gatt?: BluetoothRemoteGATTServer;
    name?: string;
}

interface BluetoothRemoteGATTServer {
    connect(): Promise<BluetoothRemoteGATTServer>;
    getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
}

interface BluetoothRemoteGATTService {
    getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTCharacteristic {
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
    addEventListener(type: string, listener: EventListener): void;
}

interface BluetoothRequestDeviceOptions {
    filters: Array<{
        namePrefix?: string;
        services?: string[];
    }>;
}

interface Navigator {
    bluetooth?: {
        requestDevice(options: BluetoothRequestDeviceOptions): Promise<BluetoothDevice>;
    };
}
