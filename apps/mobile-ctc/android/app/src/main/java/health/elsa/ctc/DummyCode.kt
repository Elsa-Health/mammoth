package health.elsa.ctc

import io.ipfs.api.IPFS

public class DummyCode {
    init {
        val ipfs = IPFS("/ip4/192.168.139.164/tcp/4001")
    }
}