package br.com.leonardosr.api.shared.util;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;

public final class IpAnonymizer {
    private IpAnonymizer() {}

    public static String anonymize(String raw) {
        if (raw == null || raw.isBlank()) {
            return null;
        }

        try {
            var address = InetAddress.getByName(raw.trim());
            var bytes = address.getAddress();
            if (bytes.length == 4) {
                bytes[3] = 0;
                return InetAddress.getByAddress(bytes).getHostAddress();
            }
            if (bytes.length == 16) {
                Arrays.fill(bytes, 8, 16, (byte) 0);
                return InetAddress.getByAddress(bytes).getHostAddress();
            }
        } catch (UnknownHostException ignored) {
            return null;
        }

        return null;
    }
}
