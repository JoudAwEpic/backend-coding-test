"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var logConfiguration = {
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: "logs/info.log",
            level: "info",
        }),
        new winston_1.default.transports.File({
            level: "error",
            filename: "logs/error.log",
        }),
    ],
    format: winston_1.default.format.combine(winston_1.default.format.label({
        label: "Label\uD83C\uDFF7\uFE0F",
    }), winston_1.default.format.timestamp({
        format: "MMM-DD-YYYY HH:mm:ss",
    }), winston_1.default.format.printf(function (info) {
        return info.level + ": " + info.label + ": " + [info.timestamp] + ": " + info.message;
    })),
};
var logger = winston_1.default.createLogger(logConfiguration);
exports.default = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luc3Rvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3V0aWxzL3dpbnN0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBOEI7QUFFOUIsSUFBTSxnQkFBZ0IsR0FBRztJQUN2QixVQUFVLEVBQUU7UUFDVixJQUFJLGlCQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtRQUNoQyxJQUFJLGlCQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUMxQixRQUFRLEVBQUUsZUFBZTtZQUN6QixLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUM7UUFDRixJQUFJLGlCQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUMxQixLQUFLLEVBQUUsT0FBTztZQUNkLFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FBQztLQUNIO0lBQ0QsTUFBTSxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDNUIsaUJBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ25CLEtBQUssRUFBRSx5QkFBVTtLQUNsQixDQUFDLEVBQ0YsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLE1BQU0sRUFBRSxzQkFBc0I7S0FDL0IsQ0FBQyxFQUNGLGlCQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDbkIsVUFBQyxJQUFJO1FBQ0gsT0FBRyxJQUFJLENBQUMsS0FBSyxVQUFLLElBQUksQ0FBQyxLQUFLLFVBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUssSUFBSSxDQUFDLE9BQVM7SUFBcEUsQ0FBb0UsQ0FDdkUsQ0FDRjtDQUNGLENBQUM7QUFFRixJQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXRELGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3aW5zdG9uIGZyb20gXCJ3aW5zdG9uXCI7XG5cbmNvbnN0IGxvZ0NvbmZpZ3VyYXRpb24gPSB7XG4gIHRyYW5zcG9ydHM6IFtcbiAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoKSxcbiAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkZpbGUoe1xuICAgICAgZmlsZW5hbWU6IFwibG9ncy9pbmZvLmxvZ1wiLFxuICAgICAgbGV2ZWw6IFwiaW5mb1wiLFxuICAgIH0pLFxuICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSh7XG4gICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgZmlsZW5hbWU6IFwibG9ncy9lcnJvci5sb2dcIixcbiAgICB9KSxcbiAgXSxcbiAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgIHdpbnN0b24uZm9ybWF0LmxhYmVsKHtcbiAgICAgIGxhYmVsOiBgTGFiZWzwn4+377iPYCxcbiAgICB9KSxcbiAgICB3aW5zdG9uLmZvcm1hdC50aW1lc3RhbXAoe1xuICAgICAgZm9ybWF0OiBcIk1NTS1ERC1ZWVlZIEhIOm1tOnNzXCIsXG4gICAgfSksXG4gICAgd2luc3Rvbi5mb3JtYXQucHJpbnRmKFxuICAgICAgKGluZm8pID0+XG4gICAgICAgIGAke2luZm8ubGV2ZWx9OiAke2luZm8ubGFiZWx9OiAke1tpbmZvLnRpbWVzdGFtcF19OiAke2luZm8ubWVzc2FnZX1gXG4gICAgKVxuICApLFxufTtcblxuY29uc3QgbG9nZ2VyID0gd2luc3Rvbi5jcmVhdGVMb2dnZXIobG9nQ29uZmlndXJhdGlvbik7XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiJdfQ==